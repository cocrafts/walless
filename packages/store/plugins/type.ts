import PouchDB from 'pouchdb-core';

export type UpsertDiffFunc<T extends object> = (
	doc: PouchDB.Core.Document<T>,
) => Promise<
	Omit<PouchDB.Core.Document<T>, '_id'> & { _id?: string; _rev?: string }
>;
