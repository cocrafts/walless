import type {
	DocumentType,
	PublicKeyDocument,
	SettingDocument,
} from '@walless/store';

import { storage } from './db';

export interface Migration {
	version: number;
	collections: DocumentType[];
	migrate: (
		migration: Migration,
		item: never,
		collection: DocumentType,
	) => Promise<void>;
}

export const runMigration = async (migrations: Migration[]) => {
	for (const migration of migrations) {
		for (const collection of migration.collections) {
			const result = await storage.find({ selector: { type: collection } });
			console.log(result, '<--');

			for (const doc of result.docs) {
				await migration.migrate(migration, doc as never, collection);
			}
		}
	}
};

export const migrateDatabase = async () => {
	const setting = await storage.safeGet<SettingDocument>('settings');
	const storedVersion = setting?.config.storageVersion || 0;
	const installationVersion = migrations[migrations.length - 1].version;

	if (!setting?.profile?.id) return;
	if (storedVersion < installationVersion) {
		const newerFilter = (i: Migration) => i.version > storedVersion;
		const filteredMigration = migrations.filter(newerFilter);

		await runMigration(filteredMigration);
		await storage.upsert<SettingDocument>('settings', async (setting) => {
			setting.config = Object.assign({}, setting.config);
			setting.config.storageVersion = installationVersion;
			return setting;
		});
	}
};

export const migrations: Migration[] = [
	{
		version: 1,
		collections: ['PublicKey'],
		migrate: async ({ version }, item, collection) => {
			if (collection === 'PublicKey') {
				const key = item as PublicKeyDocument;
				console.log(version, key);
				storage.upsert<PublicKeyDocument>(key._id, async (item) => {
					return { ...item, extra: 'hehe' } as never;
				});
			}
		},
	},
];
