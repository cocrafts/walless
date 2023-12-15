import { createRoot } from 'react-dom/client';
import { runBridge } from 'bridge';
import { injectModules } from 'utils/ioc';
import { checkBrowserInitialURL } from 'utils/navigation';

import 'raf/polyfill';
import 'setimmediate';

import App from './src';

const container = document.getElementById('root');
const root = createRoot(container);

checkBrowserInitialURL();
injectModules().then(runBridge);
root.render(<App />);
