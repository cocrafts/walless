import { FC } from 'react';
import { SplashInner } from '@walless/app';
import { UserProfile } from '@walless/storage';

export const SplashWrapper: FC = () => {
	const logoSrc = { uri: '/img/icon-lg.png' };

	const initialize = async () => {
		console.log('initializing...');
		return { name: 'fluctlight-kayaba!' };
	};

	const onReady = (profile: UserProfile) => {
		console.log('ready!', profile);
	};

	return (
		<SplashInner
			logoSrc={logoSrc}
			initialize={initialize}
			onReady={onReady as never}
		/>
	);
};

export default SplashWrapper;
