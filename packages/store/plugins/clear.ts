const persistedIds = ['system'];

export async function clearAllDocs(this: PouchDB.Database) {
	const { rows } = await this.allDocs();
	rows.map(async (row) => {
		if (persistedIds.indexOf(row.id) === -1) {
			const doc: { _deleted: boolean } = await this.get(row.id);
			doc._deleted = true;
			return this.put(doc);
		}
	});
}
