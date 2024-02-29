import { create } from '@walless/store';
import MemoryAdapter from 'pouchdb-adapter-memory';

export const storage = create('test', MemoryAdapter);
