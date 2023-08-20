import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'https://nerve.walless.io/graphql',
	generates: {
		'./packages/graphql/types.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
		},
		'./schema.graphql': {
			plugins: ['schema-ast'],
		},
	},
};

export default config;
