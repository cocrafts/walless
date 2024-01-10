import { AppRegistry } from 'react-native';
import { injectModules } from 'utils/ioc';

import 'utils/shim';

import { name as appName } from './app.json';
import App from './src';

injectModules();
AppRegistry.registerComponent(appName, () => App);
