const { resolve } = require('path');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

const wasmBundler = (outDir) => (config) => {
	config.entry.app.import.unshift('env.js');
	config.plugins.push(
		new WasmPackPlugin({
			crateDirectory: resolve(__dirname, '../../wasm'),
			outDir,
		}),
	);

	config.experiments = {
		asyncWebAssembly: true,
	};

	return config;
};

module.exports = {
	wasmBundler,
};
