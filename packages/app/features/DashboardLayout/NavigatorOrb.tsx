import type { FC, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import type { ExtensionStoreMetadata } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	AnimatedView,
	BindDirections,
	ContextMenuContainer,
	modalActions,
	View,
} from '@walless/gui';
import type { ExtensionDocument } from '@walless/store';

import ActiveBar from './ActiveBar';

interface Props {
	item: ExtensionDocument;
	isActive?: boolean;
	hasUpdate?: boolean;
	children?: ReactNode;
	ContextComponent?: FC<{
		config: ModalConfigs;
		onRemoveLayout?: (item: ExtensionDocument) => void;
	}>;
	onPress?: (item: ExtensionDocument) => void;
	onRemoveLayout?: (item: ExtensionDocument) => void;
}

export const NavigatorOrb: FC<Props> = ({
	item,
	isActive,
	hasUpdate,
	children,
	ContextComponent,
	onPress,
	onRemoveLayout,
}) => {
	const containerRef = useRef(null);
	const iconColor = getIconColor(isActive, item.storeMeta);
	const iconSize = item.storeMeta?.iconSize || 20;
	const iconUri = item.storeMeta?.iconUri;
	const iconSource = { uri: iconUri };
	const offset = useSharedValue(0);
	const radius = useSharedValue(isActive ? 1000 : 15);
	const hoverBarStyle = useAnimatedStyle(() => {
		return {
			opacity: offset.value,
			transform: [
				{ scale: offset.value },
				{ translateX: interpolate(offset.value, [0, 1], [0, barWidth]) },
			],
		};
	}, [offset]);

	const orbStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: iconColor,
			borderRadius: withTiming(radius.value, {
				duration: 320,
				easing: Easing.bezier(0.51, 0.58, 0.23, 0.99),
			}),
		};
	}, [isActive]);

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

	const handleContextMenu = () => {
		if (!ContextComponent) return;
		modalActions.show({
			id: `navigator-orb-${item._id}`,
			component: ({ config }) => (
				<ContextComponent config={config} onRemoveLayout={onRemoveLayout} />
			),
			context: { item },
			bindingRef: containerRef,
			maskActiveOpacity: 0,
			bindingDirection: BindDirections.Right,
			animateDirection: AnimateDirections.Right,
			positionOffset: {
				y: orbSize / 2,
			},
		});
	};

	useEffect(() => {
		radius.value = isActive ? orbSize / 2 : 15;
	}, [isActive]);

	return (
		<View ref={containerRef} style={styles.container}>
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
				onContextMenu={handleContextMenu}
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

const getIconColor = (
	isActive: boolean | undefined,
	storeMeta: ExtensionStoreMetadata,
	defaultColor = '#FFFFFF',
) => {
	if (isActive) {
		return storeMeta?.iconActiveColor || storeMeta?.iconColor || defaultColor;
	}

	return storeMeta?.iconColor || defaultColor;
};
