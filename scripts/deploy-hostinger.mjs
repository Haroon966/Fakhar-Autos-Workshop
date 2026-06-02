#!/usr/bin/env node
/**
 * Deploy dist/ to Hostinger via SSH + rsync.
 *
 * Setup: copy .env.example → .env (SSH section), add your SSH public key in hPanel.
 * Run: npm run deploy:hostinger
 */
import { access, constants } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(root, 'dist');

const host = process.env.SSH_HOST;
const user = process.env.SSH_USER;
const port = process.env.SSH_PORT || '65002';
const remotePath =
	process.env.SSH_REMOTE_PATH || 'domains/fakharautoworkshop.com/public_html';
const identityFile = (process.env.SSH_KEY || `${process.env.HOME}/.ssh/id_ed25519`).replace(
	/^~/,
	process.env.HOME || '',
);

function fail(message) {
	console.error(`\nDeploy failed: ${message}`);
	process.exit(1);
}

function run(command, args, options = {}) {
	return new Promise((resolvePromise, reject) => {
		const child = spawn(command, args, { stdio: 'inherit', ...options });
		child.on('close', (code) =>
			code === 0 ? resolvePromise() : reject(new Error(`${command} exited with code ${code}`)),
		);
	});
}

async function main() {
	if (!host || !user) {
		fail('Set SSH_HOST and SSH_USER in .env (see .env.example).');
	}

	const skipBuild = process.argv.includes('--skip-build');
	if (!skipBuild) {
		console.log('Building site…');
		await run('npm', ['run', 'build'], { cwd: root, shell: true });
	}

	try {
		await access(distDir, constants.R_OK);
	} catch {
		fail('dist/ not found. Run npm run build first.');
	}

	try {
		await access(identityFile, constants.R_OK);
	} catch {
		fail(`SSH key not found at ${identityFile}. Set SSH_KEY in .env or add a key in hPanel.`);
	}

	const destination = `${user}@${host}:${remotePath.replace(/\/$/, '')}/`;
	const sshCommand = `ssh -p ${port} -i ${identityFile} -o StrictHostKeyChecking=accept-new`;

	console.log(`Deploying ${distDir}/ → ${destination}`);
	console.log(`SSH port ${port}`);

	const rsyncArgs = [
		'-avz',
		'--delete',
		'-e',
		sshCommand,
		`${distDir}/`,
		destination,
	];

	if (process.argv.includes('--dry-run')) {
		rsyncArgs.splice(1, 0, '--dry-run');
		console.log('Dry run — no files will be changed on the server.');
	}

	await run('rsync', rsyncArgs);

	console.log('\nDeploy complete.');
	console.log('Site: https://fakharautoworkshop.com/');
}

main().catch((err) => fail(err.message || String(err)));
