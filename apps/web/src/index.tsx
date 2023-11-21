import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from 'components/App';

export const AppContainer = () => {
	return (
		<SafeAreaProvider>
			<App />
		</SafeAreaProvider>
	);
};

export default AppContainer;
