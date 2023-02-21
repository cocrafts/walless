import { createRoot } from 'react-dom/client';
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';
import { configureAws } from 'utils/aws';

import AppContainer from './src';

configureAws();
enableExperimentalWebImplementation(true);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<AppContainer />);
