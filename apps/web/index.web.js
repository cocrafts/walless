import { createRoot } from 'react-dom/client';
import { injectRuntime } from 'bridge/entry';

import '@tamagui/polyfill-dev';
import 'raf/polyfill';
import 'setimmediate';

import App from './src';
import tamaguiConfig from './tamagui.config';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App tamaguiConfig={tamaguiConfig} />);

injectRuntime();
