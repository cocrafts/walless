import { createRoot } from 'react-dom/client';
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';
import { loadWasm } from '@walless/core';

import App from './src';

enableExperimentalWebImplementation(true);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);

loadWasm('/index_bg.wasm').then((module) => {
	console.log(module.add?.(1, 3));
});
