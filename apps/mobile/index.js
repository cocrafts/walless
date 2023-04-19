import { AppRegistry } from 'react-native';

import './src/utils/shim';

import PouchDB from './src/utils/pouchdb';
import { name as appName } from './app.json';
import App from './src';

AppRegistry.registerComponent(appName, () => App);

const db = new PouchDB('mydb.db', {
	adapter: 'react-native-sqlite',
});

db.info().then((info) => console.log(info));
