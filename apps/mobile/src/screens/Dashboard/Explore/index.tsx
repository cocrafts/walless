import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { useSafeAreaInsets, WidgetExplorerFeat } from '@walless/app';
import { tabBarHeight } from 'stacks/Dashboard/TabBar';

export const ExplorerScreen: FC = () => {
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		marginTop: insets.top,
		marginBottom: tabBarHeight + insets.bottom,
	};

	return <WidgetExplorerFeat style={containerStyle} />;
};

export default ExplorerScreen;
