const persistedIds = ['system'];

export async function clearAllDocs(this: PouchDB.Database) {
	const { rows } = await this.allDocs();
	rows.map((row) => {
		if (persistedIds.indexOf(row.id) === -1) {
			return this.remove(row.id, row.value.rev);
		}
	});
}
