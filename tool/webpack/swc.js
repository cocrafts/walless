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
		},
		options,
	);

module.exports = {
	generateSwcOptions,
};
