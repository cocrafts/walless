import { createRoot } from 'react-dom/client';

import 'raf/polyfill';
import 'setimmediate';

import App from './src';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
