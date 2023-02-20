import { createRoot } from 'react-dom/client';
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';

import registerServiceWorker from './worker/registration';
import AppContainer from './src';

enableExperimentalWebImplementation(true);
registerServiceWorker();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<AppContainer />);
