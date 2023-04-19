import WebSQLite from 'react-native-quick-websql';
import HttpPouch from 'pouchdb-adapter-http';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import PouchDB from 'pouchdb-core';
import mapreduce from 'pouchdb-mapreduce';
import replication from 'pouchdb-replication';

import 'react-native-get-random-values';

const SQLiteAdapter = SQLiteAdapterFactory(WebSQLite);

export default PouchDB.plugin(HttpPouch)
	.plugin(replication)
	.plugin(mapreduce)
	.plugin(SQLiteAdapter);
