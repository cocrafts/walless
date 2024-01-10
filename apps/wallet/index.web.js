import { createRoot } from 'react-dom/client';
import { runBridge } from 'bridge';
import { configureBrowserRuntime } from 'utils/browser';
import { injectModules } from 'utils/ioc';

import 'raf/polyfill';
import 'setimmediate';

import App from './src';

const container = document.getElementById('root');
const root = createRoot(container);

configureBrowserRuntime();
injectModules().then(runBridge);
root.render(<App />);
