const fs = require('fs-extra');
const manifest = require('./manifest.json');

const cloneExtensionBuild = (platform, override = {}) => {
	const manifestUri = `./builds/${platform}/manifest.json`;
	const mergedManifest = { ...manifest, ...override };

	fs.copySync(`./metacraft`, `./builds/${platform}`);
	fs.writeJsonSync(manifestUri, mergedManifest, { spaces: 2 });
};

cloneExtensionBuild('chrome');
cloneExtensionBuild('firefox', {
	background: {
		scripts: ['background.js'],
	},
});
