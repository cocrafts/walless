import { createRoot } from 'react-dom/client';
import { injectRuntime } from 'bridge/entry';
import { initializeStates } from 'state/entry';

import '@tamagui/polyfill-dev';
import 'raf/polyfill';
import 'setimmediate';

import PouchDB from './src/utils/pouchdb';
import App from './src';
import tamaguiConfig from './tamagui.config';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App tamaguiConfig={tamaguiConfig} />);

injectRuntime();
initializeStates();

const db = new PouchDB('kittens');

db.info().then((info) => console.log(info));
