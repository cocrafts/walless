import { type FC, type ReactNode } from 'react';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { AnimatedView, ContextMenuContainer, View } from '@walless/gui';
import { ExtensionDocument } from '@walless/store';

import ActiveBar from './ActiveBar';

interface Props {
	item: ExtensionDocument;
	isActive?: boolean;
	hasUpdate?: boolean;
	children?: ReactNode;
	onPress?: (item: ExtensionDocument) => void;
}

export const NavigatorOrb: FC<Props> = ({
	item,
	isActive,
	hasUpdate,
	children,
	onPress,
}) => {
	const iconColor = item.storeMeta?.iconColor || 'white';
	const iconSize = item.storeMeta?.iconSize || 20;
	const iconUri = item.storeMeta?.iconUri;
	const iconSource = { uri: iconUri };
	const offset = useSharedValue(0);
	const hoverBarStyle = useAnimatedStyle(() => {
		return {
			opacity: offset.value,
			transform: [
				{ scale: offset.value },
				{ translateX: interpolate(offset.value, [0, 1], [0, barWidth]) },
			],
		};
	}, [offset]);

	const orbStyle = {
		backgroundColor: iconColor,
	};

	const iconImgStyle = {
		width: iconSize,
		height: iconSize,
	};

	const handleHoverIn = () => {
		if (isActive) return;
		offset.value = withTiming(1, {
			duration: 320,
			easing: Easing.bezier(0.51, 0.58, 0.23, 0.99),
		});
	};

	const handleHoverOut = () => {
		if (isActive) return;
		offset.value = withTiming(0, {
			duration: 320,
			easing: Easing.bezier(0.51, 0.58, 0.23, 0.99),
		});
	};

	return (
		<View style={styles.container}>
			{hasUpdate && <View style={styles.activityDot} />}
			{isActive && (
				<ActiveBar
					width={barWidth}
					height={orbSize}
					fromHeight={barHoverHeight}
				/>
			)}
			<AnimatedView style={[styles.hoverBar, hoverBarStyle]} />
			<ContextMenuContainer
				noSelect
				contentContainerStyle={[styles.orbStyle, orbStyle]}
				onHoverIn={handleHoverIn}
				onHoverOut={handleHoverOut}
				onPress={() => onPress?.(item)}
			>
				{children || <Image style={iconImgStyle} source={iconSource} />}
			</ContextMenuContainer>
		</View>
	);
};

export default NavigatorOrb;

const orbSize = 40;
const barWidth = 4;
const barHoverHeight = 18;
const barStyle: ViewStyle = {
	backgroundColor: 'white',
	position: 'absolute',
	top: orbSize / 2 - barHoverHeight / 2,
	left: -barWidth,
	width: barWidth,
	height: barHoverHeight,
	borderTopRightRadius: barWidth,
	borderBottomRightRadius: barWidth,
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	orbStyle: {
		width: orbSize,
		height: orbSize,
		borderRadius: 15,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	activityDot: {
		backgroundColor: 'white',
		position: 'absolute',
		top: orbSize / 2 - barWidth,
		left: 0,
		width: barWidth,
		height: barWidth * 2,
		borderTopRightRadius: barWidth,
		borderBottomRightRadius: barWidth,
	},
	activeBar: {
		...barStyle,
		top: 0,
		left: 0,
		height: orbSize - 4,
	},
	hoverBar: barStyle,
});
