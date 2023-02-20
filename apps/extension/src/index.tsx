import { FC } from 'react';
import SplashScreen from 'components/Splash';
import RootStack from 'stacks/Root';
import { useSnapshot } from 'utils/hook';
import { appState } from 'utils/state/app';

export const AppContainer: FC = () => {
	const app = useSnapshot(appState);

	if (app.loading) {
		return <SplashScreen />;
	}

	return <RootStack />;
};

export default AppContainer;
