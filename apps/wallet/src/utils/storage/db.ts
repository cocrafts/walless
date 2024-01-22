import WebSQLite from 'react-native-quick-websql';
import { create } from '@walless/store';
import { SQLiteAdapterFactory } from 'pouchdb-adapter-react-native-sqlite';

const SQLiteAdapter = SQLiteAdapterFactory(WebSQLite);

export const storage = create('engine', SQLiteAdapter);
