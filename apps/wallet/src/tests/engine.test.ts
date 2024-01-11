import { create, type Database } from '@walless/store';
import { createEngine } from 'engine';
import MemoryAdapter from 'pouchdb-adapter-memory';
import PouchDB from 'pouchdb-core';

PouchDB.plugin(MemoryAdapter);
let db: Database;

beforeAll(() => {
	db = create('test', MemoryAdapter);
});

describe('test engine', () => {
	test('engine register correctly', async () => {
		const engine = await createEngine(db);
		const counts: number[] = [];
		engine.register('firstRunner', (config) => {
			expect(config).not.toBeNull();
			return {
				start() {
					counts.push(1);
				},
				stop() {
					counts.push(-1);
				},
				getContext() {},
			};
		});

		engine.start();
		expect(counts[0]).toEqual(1);
		engine.stop();
		expect(counts[0]).toEqual(1);
		expect(counts[1]).toEqual(-1);
	});
});
