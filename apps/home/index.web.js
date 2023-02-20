import { createRoot } from 'react-dom/client';
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';

import AppContainer from './src';

enableExperimentalWebImplementation(true);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<AppContainer />);
