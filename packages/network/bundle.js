const fs = require('fs');
const fsp = require('fs/promises');

if (!fs.existsSync('dist')) {
	fs.mkdirSync('dist');
}

async function bundle() {
	await Promise.all([
		fsp.cp('src/sui', 'dist/sui', { recursive: true }),
		fsp.cp('src/solana', 'dist/solana', { recursive: true }),
		fsp.cp('src/aptos', 'dist/aptos', { recursive: true }),
		fsp.cp('src/tezos', 'dist/tezos', { recursive: true }),
		fsp.cp('src/utils', 'dist/utils', { recursive: true }),
		fsp.copyFile('package.json', 'dist/package.json'),
		// fsp.copyFile('index.ts', 'dist/index.ts'),
		fsp.writeFile('dist/yarn.lock', ''),
	]);
}

bundle();
