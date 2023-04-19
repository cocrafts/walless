import { FC } from 'react';
import { View } from 'react-native';

import SplashScreen from './screens/Splash';

export const Index: FC = () => {
	return (
		<View style={{ flex: 1 }}>
			<SplashScreen />
		</View>
	);
};

export default Index;
