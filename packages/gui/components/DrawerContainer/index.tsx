import { type FC, type ReactNode } from 'react';
import type {
	LayoutChangeEvent,
	LayoutRectangle,
	StyleProp,
	ViewStyle,
} from 'react-native';
import type { DrawerPosition } from 'react-native-gesture-handler';
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
	drawerAnimator,
}) => {
	const drawerLayout = useSharedValue<LayoutRectangle>(idleLayout);
	const contentLayout = useSharedValue<LayoutRectangle>(idleLayout);
	const animator = drawerAnimator || drawerAnimators[drawerType];
	const animatorContext: AnimatorContext = {
		drawerPosition,
		drawerLayout,
		contentLayout,
	};
	const animatedContainerStyle = useAnimatedStyle(() => {
		return animator.container(animatorContext);
	}, [drawerType, drawerLayout, contentLayout]);
	const animatedDrawerStyle = useAnimatedStyle(() => {
		return animator.drawer(animatorContext);
	}, [drawerType, drawerLayout, contentLayout]);
	const animatedContentContainerStyle = useAnimatedStyle(() => {
		return animator.content(animatorContext);
	}, [drawerType, drawerLayout, contentLayout]);

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
			</Animated.View>
		</Animated.View>
	);
};

export default DrawerContainer;

export * from './shared';
