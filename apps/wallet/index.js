import { AppRegistry } from 'react-native';
import { initializeApp } from 'utils/startup';

import 'utils/shim';

import { name as appName } from './app.json';
import App from './src';

initializeApp();
AppRegistry.registerComponent(appName, () => App);
