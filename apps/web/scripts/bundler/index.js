require('dotenv').config({ path: '.env.production' });

const fs = require('fs-extra');
const { readFileSync } = require('fs');
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
