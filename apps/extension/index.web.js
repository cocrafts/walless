import { createRoot } from 'react-dom/client';
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';
import { configurePlatformDynamics } from 'utils/system';

import App from './src';

configurePlatformDynamics();
enableExperimentalWebImplementation(true);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
