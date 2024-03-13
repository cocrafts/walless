import { logger } from '@walless/core';

import type { Database } from '..';
import type { PouchDocument, SettingDocument } from '../utils/type';

type MigrateScope = 'app' | 'kernel' | 'all';

type Migration = {
	description?: string;
	version: number;
	migrate: (storage: Database) => Promise<void>;
	scope: MigrateScope;
};

export const migrateDatabase = async (
	storage: Database,
	scope: MigrateScope,
) => {
	logger.info(`start migrating database, scope: ${scope}`);
	const setting = await storage.safeGet<SettingDocument>('settings');
	if (!setting?.profile?.id) return;

	const storedVersion = setting?.config?.storageVersion || 0;
	const latestVersion = migrations[migrations.length - 1].version;

	if (storedVersion < latestVersion) {
		const newerFilter = (i: Migration) =>
			i.version > storedVersion && (i.scope === 'all' || i.scope === scope);

		const filteredMigrations = migrations.filter(newerFilter);

		await runMigrations(storage, filteredMigrations);
		await storage.upsert<SettingDocument>('settings', async (setting) => {
			setting.config = Object.assign({}, setting.config);
			setting.config.storageVersion = latestVersion;
			return setting;
		});
	}
};

const runMigrations = async (storage: Database, migrations: Migration[]) => {
	for (const migration of migrations) {
		logger.info(`migrating database, version: ${migration.version}`);
		await migration.migrate(storage);
	}
};

const migrations: Migration[] = [
	{
		version: 2,
		description:
			'This migration removes all assets/histories documents from the database. Apply new universal/cross-chain assets and histories.',
		scope: 'app',
		migrate: async (storage: Database) => {
			const migrateTokenPromises = storage
				.find<PouchDocument<unknown>>({
					selector: { type: 'Token', account: { $exists: true } },
				})
				.then(({ docs: tokens }) => {
					return tokens.map(async (token) => {
						await storage.removeDoc(token._id);
					});
				});

			const migrateNFTPromises = storage
				.find<PouchDocument<unknown>>({
					selector: { type: 'NFT', account: { $exists: true } },
				})
				.then(({ docs: tokens }) => {
					return tokens.map(async (token) => {
						await storage.removeDoc(token._id);
					});
				});

			const migrateNFTCollectionPromises = storage
				.find<PouchDocument<unknown>>({
					selector: { type: 'Collection', metadata: { $exists: true } },
				})
				.then(({ docs: tokens }) => {
					return tokens.map(async (token) => {
						await storage.removeDoc(token._id);
					});
				});

			const migrateHistoryPromises = storage
				.find<PouchDocument<unknown>>({
					selector: { type: 'History' },
				})
				.then(({ docs: histories }) => {
					return histories.map(async (history) => {
						await storage.removeDoc(history._id);
					});
				});

			await Promise.all([
				migrateTokenPromises,
				migrateNFTPromises,
				migrateNFTCollectionPromises,
				migrateHistoryPromises,
			]);
		},
	},
];
