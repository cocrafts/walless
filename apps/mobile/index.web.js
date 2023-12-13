import { createRoot } from 'react-dom/client';
import { injectModules } from 'utils/ioc';

// import { injectRuntime } from 'bridge/entry';
import 'raf/polyfill';
import 'setimmediate';

import App from './src';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
injectModules().then(async () => {
	// await Promise.all([injectRuntime()]);
});
