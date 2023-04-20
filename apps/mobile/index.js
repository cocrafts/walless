import { AppRegistry } from 'react-native';

import './src/utils/shim';

import { initializeServices } from './src/utils/initializer';
import { name as appName } from './app.json';
import App from './src';

AppRegistry.registerComponent(appName, () => App);

initializeServices();
