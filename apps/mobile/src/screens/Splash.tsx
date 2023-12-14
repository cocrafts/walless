import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { SplashFeature } from '@walless/app';
import { asset } from 'utils/config';
import type { RootParamList } from 'utils/navigation';
import { appActions } from 'utils/state';

type Props = StackScreenProps<RootParamList, 'Splash'>;

export const SplashScreen: FC<Props> = () => {
	return (
		<SplashFeature
			logoSrc={asset.misc.walless}
			initialize={appActions.bootstrap}
			onReady={appActions.launchApp as never}
		/>
	);
};

export default SplashScreen;
