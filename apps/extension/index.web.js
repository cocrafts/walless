import { createRoot } from 'react-dom/client';
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';
import { injectWorker } from 'utils/worker';

import App from './src';

enableExperimentalWebImplementation(true);
injectWorker();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
