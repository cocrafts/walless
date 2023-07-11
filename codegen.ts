import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'https://api-dev.walless.io/light',
	generates: {
		'./packages/graphql/types.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
		},
	},
};

export default config;
