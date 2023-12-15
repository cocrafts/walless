import type { FC } from 'react';
import { SplashFeature } from '@walless/app';
import { appActions } from 'state/app';
import { asset } from 'utils/config';

export const SplashScreen: FC = () => {
	return (
		<SplashFeature
			logoSrc={asset.misc.walless}
			initialize={appActions.bootstrap}
			onReady={appActions.launchApp as never}
		/>
	);
};

export default SplashScreen;
