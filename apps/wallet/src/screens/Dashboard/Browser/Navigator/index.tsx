import type { FC } from 'react';
import { useState } from 'react';
import type {
	LayoutChangeEvent,
	LayoutRectangle,
	StyleProp,
	ViewStyle,
} from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	interpolate,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { idleLayout } from '@walless/gui';
import { lighten } from 'color2k';
import { browserActions, browserState } from 'state/browser';
import { useSnapshot } from 'utils/hooks';
import { colors } from 'utils/style';

import UrlInput from './UrlInput';
import UrlPreview from './UrlPreview';

interface Props {
	style?: StyleProp<ViewStyle>;
	url?: string;
	progress: SharedValue<number>;
	onGo?: (url: string) => void;
}

export const BrowserNavigator: FC<Props> = ({ style, onGo, progress }) => {
	const { isInputMode } = useSnapshot(browserState);
	const [layout, setLayout] = useState<LayoutRectangle>(idleLayout);

	const progressIndicatorStyle = useAnimatedStyle(() => {
		return {
			position: 'absolute',
			top: 0,
			left: -layout.width,
			right: 0,
			bottom: 0,
			opacity: interpolate(progress.value, [0, 1], [0.5, 0]),
			transform: [{ translateX: layout.width * progress.value }],
			backgroundColor: '#000000',
		};
	}, [layout, progress]);

	const onContainerLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setLayout(nativeEvent.layout);
	};

	return (
		<View style={[styles.container, style]} onLayout={onContainerLayout}>
			<View style={styles.progressContainer}>
				<Animated.View style={progressIndicatorStyle} />
				{isInputMode ? (
					<UrlInput
						url={browserState.url}
						onBlur={() => browserActions.toggleInputMode(false)}
						onSubmit={onGo}
					/>
				) : (
					<UrlPreview
						url={browserState.url}
						onPress={() => browserActions.toggleInputMode(true)}
					/>
				)}
			</View>
		</View>
	);
};

export default BrowserNavigator;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.tabNavigatorBg,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderColor: 'rgba(255, 255, 255, 0.14)',
	},
	progressContainer: {
		height: 40,
		marginVertical: 8,
		marginHorizontal: 12,
		borderRadius: 8,
		backgroundColor: lighten(colors.tabNavigatorBg, 0.05),
		overflow: 'hidden',
	},
	urlPreviewContainer: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'red',
	},
	urlPreviewText: {
		color: '#FFFFFF',
	},
	input: {
		...StyleSheet.absoluteFillObject,
		paddingHorizontal: 18,
		color: '#FFFFFF',
	},
});
