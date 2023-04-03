const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');
const { tamaguiBuild } = require('../../tool/webpack/tamagui');
const { copyAssets } = require('../../tool/webpack/asset');
const { splitChunks } = require('../../tool/webpack/chunk');
const { setEnvironments } = require('../../tool/webpack/env');

module.exports = {
	useReact: true,
	port: () => 3003,
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	webpackMiddlewares: [
		tamaguiBuild,
		copyAssets,
		splitChunks,
		web3Polyfills,
		setEnvironments({
			process: {
				env: {
					TAMAGUI_TARGET: JSON.stringify('web'),
				},
			},
		}),
	],
	swcOptions: () => ({
		env: {
			targets: {
				chrome: '67',
				edge: '79',
				firefox: '68',
				opera: '54',
				safari: '14',
			},
		},
	}),
	moduleAlias: {
		global: {
			'react-native$': 'react-native-web',
			'react-native-web$': 'react-native-web',
			'react-native-svg': require.resolve('@tamagui/react-native-svg'),
		},
	},
};
