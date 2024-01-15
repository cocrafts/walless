import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { StackHeader } from 'components/StackContainer';
import { useSafeAreaInsets } from 'hooks';

import { extractWidgetComponent } from './internal';

interface WidgetFeatureProps {
	widgetId: string;
	title: string;
	style?: ViewStyle;
	onToggleDrawer: () => void;
}

export const WidgetFeature: FC<WidgetFeatureProps> = ({
	widgetId,
	title,
	style,
	onToggleDrawer,
}) => {
	const insets = useSafeAreaInsets();
	const scrollOffset = useSharedValue(60);
	const WidgetComponent = extractWidgetComponent(widgetId);

	return (
		<View style={style}>
			<StackHeader
				title={title}
				insets={insets}
				scrollOffset={scrollOffset}
				onToggleDrawer={onToggleDrawer}
			/>
			<WidgetComponent id={widgetId} />
		</View>
	);
};

export default WidgetFeature;
