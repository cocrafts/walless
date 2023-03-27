import { FC, useEffect, useRef } from 'react';
import {
	LayoutChangeEvent,
	LayoutRectangle,
	TouchableWithoutFeedback,
} from 'react-native';
import {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import {
	modalActions,
	ModalConfigs,
	rectangleAnimatedStyle,
	rectangleBind,
} from '../../state/modal';
import { Text, ZStack } from '../styled';

interface Props {
	item: ModalConfigs;
}

export const ModalContainer: FC<Props> = ({ item }) => {
	const {
		component: InnerComponent,
		bindingRectangle,
		positionOffset,
		maskStyle,
		maskActiveOpacity,
		withoutMask,
	} = item;
	const layout = useRef<LayoutRectangle>();
	const top = useSharedValue(0);
	const left = useSharedValue(0);
	const opacity = useSharedValue(0);
	const pointerEvents = item.hide || withoutMask ? 'none' : 'auto';

	const maskAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			opacity.value,
			[0, 1],
			[0, maskActiveOpacity],
			Extrapolation.CLAMP,
		),
	}));

	const wrapperStyle = useAnimatedStyle(() => {
		return rectangleAnimatedStyle(opacity, item.animateDirection, {
			position: 'absolute',
			overflow: 'hidden',
			top: top.value,
			left: left.value,
			opacity: opacity.value,
		});
	}, []);

	const onInnerLayout = async ({ nativeEvent }: LayoutChangeEvent) => {
		const calculatedRectangle = await rectangleBind(
			bindingRectangle as never,
			nativeEvent.layout,
			item.bindingDirection,
			positionOffset,
		);

		layout.current = nativeEvent.layout;
		top.value = calculatedRectangle.y;
		left.value = calculatedRectangle.x;
	};

	const closeModal = () => {
		modalActions.hide(item.id as string);
	};

	useEffect(() => {
		if (item.hide) {
			opacity.value = withSpring(0, {}, (finished) => {
				if (finished) {
					modalActions.destroy(item.id);
				}
			});
		} else {
			opacity.value = withSpring(1);
		}
	}, [item.hide]);

	useEffect(() => {
		if (!layout.current) return;
		onInnerLayout({ nativeEvent: { layout: layout.current } } as never);
	}, [bindingRectangle]);

	return (
		<ZStack fullscreen>
			{!withoutMask && (
				<TouchableWithoutFeedback
					onPress={closeModal}
				></TouchableWithoutFeedback>
			)}
			<Text>ModalContainer</Text>
		</ZStack>
	);
};

export default ModalContainer;
