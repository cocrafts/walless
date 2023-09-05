import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { SplashFeature } from '@walless/app';
import { appActions } from 'state/app';
import { resources } from 'utils/config';
import type { RootParamList } from 'utils/navigation';

type Props = StackScreenProps<RootParamList, 'Splash'>;

export const SplashWrapper: FC<Props> = (props) => {
	// props.navigation.navigate('Dashboard', {
	// 	screen: 'Home',
	// 	params: {
	// 		screen: 'Widget',
	// 		params: { id: 'solana' },
	// 	},
	// });

	return (
		<SplashFeature
			logoSrc={resources.walless.icon}
			initialize={appActions.bootstrap}
			onReady={appActions.launchApp as never}
		/>
	);
};

export default SplashWrapper;
