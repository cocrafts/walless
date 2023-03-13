import { createRoot } from 'react-dom/client';
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';
import { injectWorkers } from 'bridge/entry';

import App from './src';

enableExperimentalWebImplementation(true);
injectWorkers();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
