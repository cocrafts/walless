import { FC } from 'react';
import { SplashInner } from '@walless/app';
import { appActions } from 'state/app';

export const SplashWrapper: FC = () => {
	const logoSrc = { uri: '/img/icon-lg.png' };

	return (
		<SplashInner
			logoSrc={logoSrc}
			initialize={appActions.bootstrap}
			onReady={appActions.launchApp as never}
		/>
	);
};

export default SplashWrapper;
