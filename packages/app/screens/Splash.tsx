import { FC } from 'react';
import { Stack, Text } from '@walless/gui';

export const SplashScreen: FC = () => {
	return (
		<Stack
			flex={1}
			backgroundColor="#011726"
			alignItems="center"
			justifyContent="center"
		>
			<Text color="white">Splash</Text>
		</Stack>
	);
};

export default SplashScreen;
