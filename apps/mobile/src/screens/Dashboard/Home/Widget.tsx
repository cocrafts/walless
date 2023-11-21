import type { ViewStyle } from 'react-native';
import {
	useSafeAreaInsets,
	useSnapshot,
	WidgetExplorerFeature,
	WidgetFeature,
} from '@walless/app';
import { appState } from '@walless/engine';
import { tabBarHeight } from 'stacks/Dashboard/TabBar';

export const WidgetScreen = () => {
	const insets = useSafeAreaInsets();
	const { activeWidgetId } = useSnapshot(appState);
	const explorerContainerStyle: ViewStyle = {
		paddingTop: insets.top,
	};
	const explorerScrollStyle: ViewStyle = {
		paddingBottom: tabBarHeight + insets.bottom,
	};

	if (!activeWidgetId) {
		return (
			<WidgetExplorerFeature
				style={explorerContainerStyle}
				scrollContentContainerStyle={explorerScrollStyle}
			/>
		);
	}

	return <WidgetFeature id={activeWidgetId} />;
};

export default WidgetScreen;
