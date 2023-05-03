import { type FC } from 'react';
import { SplashFeature } from '@walless/app';

import { appActions } from '../state/app';

export const SplashWrapper: FC = () => {
	const logoSrc = require('../../assets/img/icon-lg.png');

	const initialize = async () => {
		console.log('initializing...');
		return { name: 'stranger' };
	};

	const onReady = (profile: UserProfile) => {
		console.log('ready!', profile);
	};

	return (
		<SplashFeature
			logoSrc={logoSrc}
			initialize={initialize}
			onReady={onReady as never}
		/>
	);
};

export default SplashWrapper;
