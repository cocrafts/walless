import { type FC } from 'react';
import { SplashFeature } from '@walless/component';
import { type UserProfile } from '@walless/core';

export const SplashWrapper: FC = () => {
	const logoSrc = require('../../assets/img/icon-lg.png');

	const initialize = async () => {
		console.log('initializing...');
		return { name: 'fluctlight-kayaba' };
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
