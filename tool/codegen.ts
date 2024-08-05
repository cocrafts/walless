import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config({ path: './apps/wallet/.env.development' });

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.GRAPHQL_ENDPOINT,
	generates: {
		'./packages/graphql/types.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
		},
		'./packages/graphql/gen-gql/': {
			preset: 'client',
			documents: [
				// after migrating all scopes (account, invitation, etc.),
				// we can uncomment the line below and remove all detailed documents
				// './packages/graphql/**/*.{tsx,ts}'

				// loyalty scope
				'./packages/graphql/query/loyalty.ts',
				'./packages/graphql/mutation/loyalty.ts',
			],
		},
		'./schema.graphql': {
			plugins: ['schema-ast'],
		},
	},
};

export default config;
