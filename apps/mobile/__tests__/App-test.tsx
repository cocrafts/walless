import renderer from 'react-test-renderer';

import 'react-native';

import App from '../src';

it('renders correctly', () => {
	renderer.create(<App />);
});
