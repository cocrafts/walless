import type { FC } from 'react';
import { SplashFeature } from '@walless/app';
import { appActions } from 'state/app';
import assets from 'utils/assets';

export const SplashScreen: FC = () => {
	return (
		<SplashFeature
			logoSrc={assets.misc.walless}
			initialize={appActions.bootstrap}
			onReady={appActions.launchApp as never}
		/>
	);
};

export default SplashScreen;
