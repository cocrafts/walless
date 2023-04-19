import { FC } from 'react';
import { SplashFeature } from '@walless/component';
import { appActions } from 'state/app';

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
