import type { FC } from 'react';
import { SplashFeature } from '@walless/app';
import { appActions } from 'utils/state';

export const SplashWrapper: FC = () => {
	const logoSrc = { uri: '/img/icon-lg.png' };

	return (
		<SplashFeature
			logoSrc={logoSrc}
			initialize={appActions.bootstrap}
			onReady={appActions.launchApp as never}
		/>
	);
};

export default SplashWrapper;
