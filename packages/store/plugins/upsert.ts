import PouchDB from 'pouchdb-core';

import { UpsertDiffFunc } from './type';

export async function upsert<T extends object>(
	this: PouchDB.Database,
	docId: string,
	diffFunc: UpsertDiffFunc<T>,
): Promise<PouchDB.Core.Response> {
	let doc: PouchDB.Core.Document<T & { _rev?: string }>;

	try {
		doc = await this.get(docId);
	} catch (err) {
		if ((err as PouchDB.Core.Error).status !== 404) throw err;
		doc = { _id: docId } as never;
	}

	const currentRev = doc._rev;
	const newDoc = await diffFunc(doc as never);

	newDoc._id = doc._id as string;
	newDoc._rev = currentRev;
	return this.put(newDoc);
}
