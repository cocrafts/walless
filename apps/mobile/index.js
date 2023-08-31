import { AppRegistry } from 'react-native';

import './src/utils/shim';

import { injectModules } from './src/utils/ioc';
import { name as appName } from './app.json';
import App from './src';

injectModules().then(async () => {
	AppRegistry.registerComponent(appName, () => App);
});
