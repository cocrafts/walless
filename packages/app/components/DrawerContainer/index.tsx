import type { FC, ReactNode } from 'react';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import type {
	DrawerAnimator,
	DrawerComponentProps,
	DrawerType,
} from './shared';
import { drawerAnimators } from './shared';

interface Props {
	style?: StyleProp<ViewStyle>;
	children?: ReactNode;
	DrawerComponent: FC<DrawerComponentProps>;
	drawerType?: DrawerType;
	drawerAnimator?: DrawerAnimator;
}

export const DrawerContainer: FC<Props> = ({
	style,
	children,
	DrawerComponent,
	drawerType = 'front',
	drawerAnimator,
}) => {
	const animator = drawerAnimator || drawerAnimators[drawerType];
	const drawerStyle = useAnimatedStyle(animator.drawer);

	const onDrawerLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		console.log(nativeEvent);
	};

	return (
		<View style={[styles.container, style]}>
			<Animated.View onLayout={onDrawerLayout} style={drawerStyle}>
				<DrawerComponent />
			</Animated.View>
			<Animated.View>{children}</Animated.View>
		</View>
	);
};

export default DrawerContainer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
