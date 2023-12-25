import { type FC, type ReactNode } from 'react';
import type {
	LayoutChangeEvent,
	LayoutRectangle,
	StyleProp,
	ViewStyle,
} from 'react-native';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { type DrawerPosition } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';

import { idleLayout } from '../../utils/style';

import type {
	AnimatorContext,
	DrawerAnimator,
	DrawerComponentProps,
	DrawerType,
} from './shared';
import { drawerAnimators } from './shared';

interface Props {
	style?: StyleProp<ViewStyle>;
	drawerStyle?: StyleProp<ViewStyle>;
	contentContainerStyle?: StyleProp<ViewStyle>;
	children?: ReactNode;
	DrawerComponent: FC<DrawerComponentProps>;
	drawerType?: DrawerType;
	isOpen?: boolean;
	onRequestToggle?: (flag: boolean) => void;
	drawerPosition?: DrawerPosition;
	drawerAnimator?: DrawerAnimator;
}

export const DrawerContainer: FC<Props> = ({
	style,
	drawerStyle,
	contentContainerStyle,
	children,
	DrawerComponent,
	drawerPosition = 'left',
	drawerType = 'front',
	isOpen,
	onRequestToggle,
	drawerAnimator,
}) => {
	const drawerLayout = useSharedValue<LayoutRectangle>(idleLayout);
	const contentLayout = useSharedValue<LayoutRectangle>(idleLayout);
	const animator = drawerAnimator || drawerAnimators[drawerType];
	const animatorContext: AnimatorContext = {
		drawerPosition,
		drawerLayout,
		contentLayout,
		isOpen,
	};
	const animatedContainerStyle = useAnimatedStyle(() => {
		return animator.container(animatorContext);
	}, [isOpen, drawerType, drawerLayout, contentLayout]);
	const animatedDrawerStyle = useAnimatedStyle(() => {
		return animator.drawer(animatorContext);
	}, [isOpen, drawerType, drawerLayout, contentLayout]);
	const animatedContentContainerStyle = useAnimatedStyle(() => {
		return animator.content(animatorContext);
	}, [isOpen, drawerType, drawerLayout, contentLayout]);
	const animatedMaskStyle = useAnimatedStyle(() => {
		return animator.mask(animatorContext);
	}, [isOpen, drawerType, drawerLayout, contentLayout]);

	const onDrawerLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		drawerLayout.value = nativeEvent.layout;
	};

	const onContentLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		contentLayout.value = nativeEvent.layout;
	};

	return (
		<Animated.View style={[animatedContainerStyle, style]}>
			<Animated.View
				onLayout={onDrawerLayout}
				style={[drawerStyle, animatedDrawerStyle]}
			>
				<DrawerComponent />
			</Animated.View>
			<Animated.View
				onLayout={onContentLayout}
				style={[contentContainerStyle, animatedContentContainerStyle]}
			>
				{children}

				{isOpen && (
					<TouchableWithoutFeedback onPress={() => onRequestToggle?.(false)}>
						<Animated.View style={[styles.mask, animatedMaskStyle]} />
					</TouchableWithoutFeedback>
				)}
			</Animated.View>
		</Animated.View>
	);
};

export default DrawerContainer;

const styles = StyleSheet.create({
	mask: {
		zIndex: 99,
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#000000',
		opacity: 0,
	},
});

export * from './shared';
