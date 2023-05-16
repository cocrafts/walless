export async function docRemove<T extends object>(
  this: PouchDB.Database,
  id: string,
) {
  const doc = await this.get(id);
  doc._deleted = true;
  this.put(doc);
}
