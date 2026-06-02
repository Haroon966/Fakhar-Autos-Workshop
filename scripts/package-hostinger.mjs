#!/usr/bin/env node
import { createWriteStream } from 'node:fs';
import { access, constants } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { spawn } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(root, 'dist');
const zipPath = resolve(root, 'hostinger-upload.zip');

async function main() {
	try {
		await access(distDir, constants.R_OK);
	} catch {
		console.error('Run npm run build first.');
		process.exit(1);
	}

	await new Promise((resolvePromise, reject) => {
		const child = spawn('zip', ['-r', zipPath, '.'], { cwd: distDir, stdio: 'inherit' });
		child.on('close', (code) => (code === 0 ? resolvePromise() : reject(new Error(`zip exited ${code}`))));
	});

	console.log(`\nCreated ${zipPath}`);
	console.log('Upload via hPanel → Files → public_html → Upload → Extract.');
}

main();
