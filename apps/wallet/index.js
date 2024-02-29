require('utils/shim');

import { AppRegistry } from 'react-native';

import { initializeMessaging } from './browser/kernel/messaging';
import { name as appName } from './app.json';
import App from './src';

initializeMessaging();
AppRegistry.registerComponent(appName, () => App);
