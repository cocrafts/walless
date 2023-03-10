const { merge } = require('lodash');

const generateSwcOptions = (options = {}) =>
	merge(
		{
			env: {
				targets: {
					chrome: '67',
					edge: '79',
					firefox: '68',
					opera: '54',
					safari: '14',
				},
			},
			jsc: {
				baseUrl: '.',
				paths: {
					'components/*': ['./src/components/*'],
					'screens/*': ['./src/screens/*'],
					'stacks/*': ['./src/stacks/*'],
					'utils/*': ['./src/utils/*'],
					'kernel/*': ['./src/kernel/*'],
				},
			},
		},
		options,
	);

module.exports = {
	generateSwcOptions,
};
