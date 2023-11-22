import type { ViewStyle } from 'react-native';
import {
	useSafeAreaInsets,
	useSnapshot,
	WidgetExplorerFeat,
	WidgetFeature,
} from '@walless/app';
import { appState } from '@walless/engine';
import { tabBarHeight } from 'stacks/Dashboard/TabBar';

export const WidgetScreen = () => {
	const insets = useSafeAreaInsets();
	const { activeWidgetId } = useSnapshot(appState);
	const explorerContainerStyle: ViewStyle = {
		marginTop: insets.top,
	};
	const explorerScrollStyle: ViewStyle = {
		paddingBottom: tabBarHeight + insets.bottom,
	};

	if (!activeWidgetId) {
		return (
			<WidgetExplorerFeat
				style={explorerContainerStyle}
				scrollContentContainerStyle={explorerScrollStyle}
			/>
		);
	}

	return <WidgetFeature id={activeWidgetId} />;
};

export default WidgetScreen;
