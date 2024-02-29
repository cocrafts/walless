import { createRoot } from 'react-dom/client';
import { runBridge } from 'bridge';
import { configureBrowserRuntime } from 'utils/browser';

import 'raf/polyfill';
import 'setimmediate';

import App from './src';

const container = document.getElementById('root');
const root = createRoot(container);

runBridge();
configureBrowserRuntime();
root.render(<App />);
