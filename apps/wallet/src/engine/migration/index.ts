import type { PouchDocument } from '@walless/store';
import { storage } from 'utils/storage';

import type { Migration } from './types';

export const migrations: Migration[] = [
	{
		name: 'remove deprecated asset documents',
		version: '1.1.0',
		migrate: async () => {
			const migrateTokenPromises = storage
				.find<PouchDocument<unknown>>({
					selector: {
						type: 'Token',
						account: {
							$exists: true,
						},
					},
				})
				.then(({ docs: tokens }) => {
					return tokens.map(async (token) => {
						await storage.removeDoc(token._id);
					});
				});

			const migrateNFTPromises = storage
				.find<PouchDocument<unknown>>({
					selector: {
						type: 'NFT',
						account: {
							$exists: true,
						},
					},
				})
				.then(({ docs: tokens }) => {
					return tokens.map(async (token) => {
						await storage.removeDoc(token._id);
					});
				});

			const migrateNFTCollectionPromises = storage
				.find<PouchDocument<unknown>>({
					selector: {
						type: 'Collection',
						metadata: {
							$exists: true,
						},
					},
				})
				.then(({ docs: tokens }) => {
					return tokens.map(async (token) => {
						await storage.removeDoc(token._id);
					});
				});

			await Promise.all([
				migrateTokenPromises,
				migrateNFTPromises,
				migrateNFTCollectionPromises,
			]);
		},
	},
];
