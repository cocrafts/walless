import React, { useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { useSharedValue } from 'utils/hook';
import { modalActions, ModalConfigs } from 'utils/state/modal';

interface Props {
	item: ModalConfigs;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const ModalContainer: React.FC<Props> = ({ item }) => {
	const { component: InnerComponent } = item;
	const opacity = useSharedValue(0);
	const modalAnimated = useAnimatedStyle(() => {
		const top = interpolate(opacity.value, [0, 1], [200, 0], Extrapolate.CLAMP);
		return {
			opacity: opacity.value,
			top,
		};
	});

	const onMaskPress = () => {
		modalActions.close(item.id);
	};

	useEffect(() => {
		if (item.close) {
			opacity.value = withTiming(0, {}, (finished) => {
				if (finished) modalActions.destroy(item.id);
			});
		} else {
			opacity.value = withTiming(1);
		}
	}, [item.close]);

	return (
		<AnimatedView
			style={[styles.container, modalAnimated]}
			pointerEvents="auto"
		>
			<TouchableWithoutFeedback onPress={onMaskPress}>
				<View style={styles.mask} />
			</TouchableWithoutFeedback>
			<View style={styles.contentContainer}>
				<InnerComponent config={item} />
			</View>
		</AnimatedView>
	);
};

export default ModalContainer;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		paddingTop: 40,
	},
	mask: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#000000',
		opacity: 0.7,
	},
	contentContainer: {
		flex: 1,
	},
});
