import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { ExplorerFeature, tabBarHeight, useSafeAreaInsets } from '@walless/app';

export const ExplorerScreen: FC = () => {
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		marginTop: insets.top,
		marginBottom: tabBarHeight + insets.bottom,
	};

	return <ExplorerFeature style={containerStyle} />;
};

export default ExplorerScreen;
