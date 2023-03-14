import { createRoot } from 'react-dom/client';
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';
import { configureConditionalRuntime } from 'bridge/entry';

import App from './src';

enableExperimentalWebImplementation(true);
configureConditionalRuntime();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
