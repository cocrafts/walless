import { logger } from '@walless/core';

import type { Database, PouchDocument, SettingDocument } from '../utils/type';

type MigrateScope = 'app' | 'kernel' | 'all';
interface MigrateParams {
	storage: Database;
	forceUpdate?: () => void;
}

type Migration = {
	description?: string;
	version: number;
	migrate: (params: MigrateParams) => Promise<void>;
	scope: MigrateScope;
};

export const migrateDatabase = async (
	storage: Database,
	scope: MigrateScope,
	forceUpdate?: () => void,
) => {
	logger.info(`start migrating database, scope: ${scope}`);
	const setting = await storage.safeGet<SettingDocument>('settings');
	if (!setting?.profile?.id) return;

	const storedVersion = setting?.config?.storageVersion || 0;
	const latestVersion = getLatestMigrationVersion();

	logger.info(storedVersion, latestVersion);

	if (storedVersion < latestVersion) {
		const newerVersionFilter = (i: Migration) =>
			i.version > storedVersion && (i.scope === 'all' || i.scope === scope);

		const filteredMigrations = migrations.filter(newerVersionFilter);

		if (filteredMigrations.length === 0) {
			return;
		}

		await runMigrations(storage, filteredMigrations, forceUpdate);
		await storage.upsert<SettingDocument>('settings', async (setting) => {
			setting.config = Object.assign({}, setting.config);
			setting.config.storageVersion = latestVersion;

			return setting;
		});
	}
};

const runMigrations = async (
	storage: Database,
	migrations: Migration[],
	forceUpdate?: () => void,
) => {
	for (const migration of migrations) {
		logger.info(`migrating database, version: ${migration.version}`);
		await migration.migrate({ storage, forceUpdate });
	}
};

const migrations: Migration[] = [
	{
		version: 2,
		description:
			'This migration removes all assets/histories documents from the database. Apply new universal/cross-chain assets and histories.',
		scope: 'app',
		migrate: async ({ storage }) => {
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
	{
		version: 3,
		description:
			"This migration add encodedPublicKey to Sui PublicKeyDocument['meta']",
		scope: 'app',
		migrate: async ({ forceUpdate }) => {
			forceUpdate?.();
		},
	},
];

export const getLatestMigrationVersion = () => {
	return migrations[migrations.length - 1].version;
};
