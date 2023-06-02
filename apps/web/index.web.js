import { createRoot } from 'react-dom/client';
import { injectRuntime } from 'bridge/entry';
import { injectModules } from 'utils/ioc';

import '@tamagui/polyfill-dev';
import 'raf/polyfill';
import 'setimmediate';

import App from './src';
import tamaguiConfig from './tamagui.config';

injectModules().then(async () => {
	const container = document.getElementById('root');
	const root = createRoot(container);

	root.render(<App tamaguiConfig={tamaguiConfig} />);

	await Promise.all([injectRuntime()]);
});
