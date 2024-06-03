import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import type {
	LayoutChangeEvent,
	LayoutRectangle,
	ViewStyle,
} from 'react-native';
import {
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import Animated, {
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import type { ModalConfigs } from '../../states/modal';
import {
	getSafeId,
	measureRelative,
	modalActions,
	modalState,
	rectangleAnimatedStyle,
	rectangleBind,
	referenceMap,
} from '../../states/modal';

interface Props {
	item: ModalConfigs;
}

export const ModalContainer: FC<Props> = ({ item }) => {
	const {
		id,
		component: InnerComponent,
		bindingRectangle,
		positionOffset,
		maskStyle,
		maskActiveOpacity = 0.5,
		withoutMask,
		fullWidth = true,
		fullHeight = false,
	} = item;
	const layout = useRef<LayoutRectangle>();
	const top = useSharedValue(0);
	const left = useSharedValue(0);

	// Android breaking change: Since the component has zero height, there's no initial layout change to trigger the onLayout event.
	// Reference: https://stackoverflow.com/questions/46389042/onlayout-not-being-called
	// Reference: https://github.com/facebook/react-native/wiki/#android-only-call-onlayout-when-layout-has-actually-changed-15429e---astreet
	const height = useSharedValue(1);
	const width = useSharedValue(0);
	const opacity = useSharedValue(0);
	const pointerEvents = item.hide || withoutMask ? 'none' : 'auto';

	const maskAnimatedStyle = useAnimatedStyle(
		() => ({
			opacity: interpolate(
				opacity.value,
				[0, 1],
				[0, maskActiveOpacity],
				Extrapolation.CLAMP,
			),
		}),
		[opacity],
	);

	const wrapperStyle = useAnimatedStyle(() => {
		const baseStyle: ViewStyle = {
			position: 'absolute',
			top: top.value,
			left: left.value,
			opacity: opacity.value,
		};

		if (fullWidth) baseStyle.width = width.value;

		if (fullHeight) {
			baseStyle.height = height.value;
			baseStyle.bottom = 0;

			if (positionOffset?.y && positionOffset.y > 0) {
				baseStyle.height -= positionOffset.y;
				baseStyle.top = positionOffset.y;
			}
		}

		return rectangleAnimatedStyle(opacity, item.animateDirection, baseStyle);
	}, [top, left, opacity]);

	useEffect(() => {
		opacity.value = withSpring(item.hide ? 0 : 1, {}, () => {
			if (item.hide) {
				runOnJS(modalActions.destroy)(id);
			}
		});
	}, [item.hide]);

	useEffect(() => {
		if (!layout.current) return;
		onInnerLayout({ nativeEvent: { layout: layout.current } } as never);
	}, [bindingRectangle]);

	useEffect(() => {
		if (Platform.OS !== 'web') return;
		const actualBindingRef = referenceMap[getSafeId(id)] || referenceMap.root;
		if (!actualBindingRef.current) return;

		const bindingObserver = new ResizeObserver(async () => {
			const safeId = getSafeId(item.id);
			const updatedBindingRectangle = await measureRelative(
				referenceMap[safeId],
			);
			modalState.map.set(safeId, {
				...item,
				bindingRectangle: updatedBindingRectangle,
			});
		});
		bindingObserver.observe(actualBindingRef.current as never);

		return () => bindingObserver.disconnect();
	}, []);

	const onInnerLayout = async ({ nativeEvent }: LayoutChangeEvent) => {
		const calculatedRectangle = await rectangleBind(
			bindingRectangle as never, // parent or root
			nativeEvent.layout, // current component
			item.bindingDirection,
			positionOffset,
		);

		layout.current = nativeEvent.layout;
		top.value = calculatedRectangle.y;
		left.value = calculatedRectangle.x;
		width.value = calculatedRectangle.width;
		height.value = calculatedRectangle.height;
	};

	const closeModal = () => {
		modalActions.hide(item.id as string);
	};

	return (
		<View pointerEvents={pointerEvents} style={styles.container}>
			{!withoutMask && (
				<TouchableWithoutFeedback onPress={closeModal}>
					<Animated.View style={[styles.mask, maskAnimatedStyle, maskStyle]} />
				</TouchableWithoutFeedback>
			)}
			<Animated.View onLayout={onInnerLayout} style={wrapperStyle}>
				<InnerComponent config={item} />
			</Animated.View>
		</View>
	);
};

export default ModalContainer;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	mask: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'black',
	},
});
