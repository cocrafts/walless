import { NavigationContainer } from '@react-navigation/native';
import { themeState } from '@walless/gui';
import AppContainer from 'components/AppContainer';
import ApplicationStack from 'stacks/Application';
import {
	useNavigationHydrate,
	useNotifications,
	useSnapshot,
} from 'utils/hooks';
import { linking, navigationRef } from 'utils/navigation';

export const AppStack = () => {
	const theme = useSnapshot(themeState);
	const hydrate = useNavigationHydrate();

	useNotifications();

	return (
		<AppContainer>
			<NavigationContainer
				ref={navigationRef}
				theme={theme}
				linking={linking}
				onReady={hydrate.onNavigationReady}
				onStateChange={hydrate.onNavigationStateChange}
			>
				<ApplicationStack />
			</NavigationContainer>
		</AppContainer>
	);
};

export default AppStack;
