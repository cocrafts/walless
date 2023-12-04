import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockWidgets } from '@walless/engine';

import type { HeaderProps } from '../../components/StackContainer';

import { extractWidgetComponent } from './shared';

interface Props {
	id: string;
	headerComponent?: FC<HeaderProps>;
	onToggleDrawer?: () => void;
}

export const WidgetFeature: FC<Props> = ({
	id,
	headerComponent: HeaderComponent,
	onToggleDrawer,
}) => {
	const insets = useSafeAreaInsets();
	const scrollOffset = useSharedValue(80);
	const WidgetComponent = extractWidgetComponent(id);
	const widgetName = mockWidgets.find((i) => i._id === id)?.name || 'Unkown';

	const headerElement = HeaderComponent && (
		<HeaderComponent
			onToggleDrawer={onToggleDrawer}
			title={widgetName}
			insets={insets}
			scrollOffset={scrollOffset}
		/>
	);

	return (
		<View style={styles.container}>
			{headerElement}
			<WidgetComponent id={id} />
		</View>
	);
};

export default WidgetFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
