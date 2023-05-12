import type PouchDB from 'pouchdb-core';

export async function safeGet<T extends object>(
	this: PouchDB.Database,
	id: string,
	defaultValue?: T,
): Promise<T | undefined> {
	try {
		return await this.get(id);
	} catch (err) {
		if ((err as PouchDB.Core.Error).status !== 404) throw err;
	}

	return defaultValue;
}
