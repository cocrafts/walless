import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { SplashFeature, useUniversalInsets } from '@walless/app';
import { appActions } from 'utils/state';

export const SplashWrapper: FC = () => {
	const insets = useUniversalInsets();
	const logoSrc = { uri: '/img/icon-lg.png' };
	const containerStyle: ViewStyle = {
		paddingTop: insets.top,
	};

	return (
		<SplashFeature
			style={containerStyle}
			logoSrc={logoSrc}
			initialize={appActions.bootstrap}
			onReady={appActions.launchApp as never}
		/>
	);
};

export default SplashWrapper;
