import { createRoot } from 'react-dom/client';
import { runBridge } from 'bridge';
import { injectModules } from 'utils/ioc';
import { navigationRef } from 'utils/navigation';

import 'raf/polyfill';
import 'setimmediate';

import App from './src';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);

injectModules().then(() => {
	navigationRef.navigate('Splash');
	runBridge();
});
