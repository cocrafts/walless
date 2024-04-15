import { createRoot } from 'react-dom/client';

import 'polyfill';

import App from './src';

const container = document.getElementById('root');
container.style = { width: '100%', height: '100%', backgroundColor: 'gray' };
const root = createRoot(container);
root.render(<App />);
