#!/usr/bin/env node
/** FTP/FTPS deploy fallback — npm run deploy:hostinger:ftp */
import { access, constants } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { Client } from 'basic-ftp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(root, 'dist');

const host = process.env.FTP_HOST;
const user = process.env.FTP_USER;
const password = process.env.FTP_PASSWORD;
const remoteDir = process.env.FTP_REMOTE_DIR || 'public_html';
const port = Number(process.env.FTP_PORT || 21);
const secure = process.env.FTP_SECURE !== 'false';

function fail(message) {
	console.error(`\nDeploy failed: ${message}`);
	process.exit(1);
}

async function main() {
	if (!host || !user || !password) {
		fail('Set FTP_HOST, FTP_USER, and FTP_PASSWORD in .env');
	}

	if (!process.argv.includes('--skip-build')) {
		await new Promise((resolvePromise, reject) => {
			const child = spawn('npm', ['run', 'build'], { cwd: root, stdio: 'inherit', shell: true });
			child.on('close', (code) => (code === 0 ? resolvePromise() : reject(new Error(`build exited ${code}`))));
		});
	}

	try {
		await access(distDir, constants.R_OK);
	} catch {
		fail('dist/ not found.');
	}

	const client = new Client(120_000);
	try {
		await client.access({ host, user, password, port, secure });
		await client.ensureDir(remoteDir);
		await client.cd(remoteDir);
		await client.uploadFromDir(distDir);
		console.log('\nFTP deploy complete.');
	} catch (err) {
		fail(err.message || String(err));
	} finally {
		client.close();
	}
}

main();
