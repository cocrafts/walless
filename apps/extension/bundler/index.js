const fs = require('fs-extra');
const archiver = require('archiver');
const manifest = require('./manifest.json');
const project = require('../package.json');

const zipDir = (platform) => {
	const homeBuildDir = '../home/metacraft';
	const archive = archiver('zip', { zlib: { level: 9 } });
	const stream = fs.createWriteStream(`${homeBuildDir}/${platform}.zip`);

	fs.ensureDir(homeBuildDir);

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

	fs.copySync(`./metacraft`, `./builds/${platform}`);
	fs.writeJsonSync(manifestUri, mergedManifest, { spaces: 2 });

	await zipDir(platform);
};

cloneExtensionBuild('chrome');
cloneExtensionBuild('edge');
cloneExtensionBuild('brave');
cloneExtensionBuild('opera');
cloneExtensionBuild('firefox', {
	background: {
		scripts: ['background.js'],
	},
});
