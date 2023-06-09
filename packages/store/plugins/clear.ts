export async function clear(this: PouchDB.Database) {
	await this.allDocs().then((result) => {
		return Promise.all(
			result.rows.map((row) => {
				return this.remove(row.id, row.value.rev);
			}),
		);
	});
}
