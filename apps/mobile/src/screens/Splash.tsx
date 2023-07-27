import type { FC } from 'react';
import { SplashFeature } from '@walless/app';

import { appActions } from '../state/app';
import { resources } from '../utils/config';

export const SplashWrapper: FC = () => {
	return (
		<SplashFeature
			logoSrc={resources.walless.icon}
			initialize={appActions.bootstrap}
			onReady={appActions.launchApp as never}
		/>
	);
};

export default SplashWrapper;
