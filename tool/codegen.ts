import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config({ path: './apps/web/.env.development' });

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.GRAPHQL_ENDPOINT,
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
