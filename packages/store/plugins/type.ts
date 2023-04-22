import PouchDB from 'pouchdb-core';

export type UpsertDiffFunc<T extends object> = (
	doc: PouchDB.Core.Document<T>,
) => Promise<PouchDB.Core.Document<T> & { _rev?: string }>;
