export async function docRemove<T extends { _deleted?: boolean }>(
	this: PouchDB.Database,
	id: string,
) {
	const doc: T = await this.get(id);
	doc._deleted = true;
	this.put(doc);
}
