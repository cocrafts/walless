import { createRoot } from 'react-dom/client';
import { injectRuntime } from 'bridge/entry';
import { injectModules } from 'utils/ioc';

import 'raf/polyfill';
import 'setimmediate';

import App from './src';

injectModules().then(async () => {
	const container = document.getElementById('root');
	const root = createRoot(container);

	root.render(<App />);
	await Promise.all([injectRuntime()]);
});
