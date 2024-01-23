import { AppRegistry } from 'react-native';

import 'utils/shim';

import { name as appName } from './app.json';
import App from './src';

AppRegistry.registerComponent(appName, () => App);
