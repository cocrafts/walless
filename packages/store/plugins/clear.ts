export async function clear(this: PouchDB.Database) {
	const { rows } = await this.allDocs();
	await rows.map((row) => {
		return this.remove(row.id, row.value.rev);
	});
}
