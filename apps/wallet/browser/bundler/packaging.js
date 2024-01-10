require('dotenv').config({ path: '.env.production' });

const fs = require('fs-extra');
const { readFileSync, readdirSync, writeFileSync } = require('fs');
const archiver = require('archiver');
const manifest = require('./manifest.json');
const project = require('../../package.json');

const zipDir = (platform) => {
	const buildDir = '../landing/public/builds';
	const archive = archiver('zip', { zlib: { level: 9 } });
	const stream = fs.createWriteStream(`${buildDir}/${platform}.zip`);

	fs.ensureDir(buildDir);

	return new Promise((resolve, reject) => {
		archive
			.directory(`./builds/${platform}`, false)
			.on('error', (err) => reject(err))
			.pipe(stream);

		stream.on('close', () => resolve());
		archive.finalize();
	});
};

const cloneExtensionBuild = async (platform, override = {}) => {
	const manifestUri = `./builds/${platform}/manifest.json`;
	const mergedManifest = { ...manifest, ...override, version: project.version };
	const indexTemplate = readFileSync('./metacraft/index.html', 'utf8');
	const popupTemplate = indexTemplate.replace('<body>', '<body class="popup">');

	makeBackgroundJs(['kernel.js']);

	if (platform === 'chrome') {
		mergedManifest.permissions = [...mergedManifest.permissions, 'gcm'];
	}

	if (platform !== 'firefox') {
		mergedManifest.key = process.env.EXTENSION_PUBLIC_KEY;
		mergedManifest.oauth2 = {
			client_id: process.env.EXTENSION_CLIENT_ID,
			scopes: [
				'https://www.googleapis.com/auth/userinfo.email',
				'https://www.googleapis.com/auth/userinfo.profile',
			],
		};
	}

	fs.outputFileSync('./metacraft/popup.html', popupTemplate);
	fs.copySync(`./metacraft`, `./builds/${platform}`);
	fs.writeJsonSync(manifestUri, mergedManifest, { spaces: 2 });

	await zipDir(platform);
};

const isChunkFile = (name) => {
	const [id, extension] = name.split('.');
	return !isNaN(id) && extension === 'js';
};

const makeBackgroundJs = (entries) => {
	const buildFiles = readdirSync('./metacraft');
	const existed = buildFiles.find((i) => i === 'background.js');

	if (!existed) {
		let fileContent = '';
		const chunkFiles = buildFiles.filter(isChunkFile);

		for (const chunk of chunkFiles) {
			fileContent += `importScripts('${chunk}');\n`;
		}

		for (const entry of entries) {
			fileContent += `importScripts('${entry}');\n`;
		}

		writeFileSync('./metacraft/background.js', fileContent, {
			encoding: 'utf-8',
		});
	}
};

cloneExtensionBuild('chrome');
cloneExtensionBuild('edge');
cloneExtensionBuild('brave');
cloneExtensionBuild('opera');
cloneExtensionBuild('firefox', {
	browser_specific_settings: {
		gecko: {
			id: 'extension@walless.io',
		},
	},
	background: {
		scripts: ['background.js'],
	},
});
