import { type FC, useEffect } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import type { RouteProp } from '@react-navigation/native';
import { AnimatedPressable } from '@walless/gui';
import type { IconProps } from '@walless/icons';
import type { DashboardParamList } from 'utils/navigation';

export interface Props {
	style?: StyleProp<ViewStyle>;
	icon: FC<IconProps>;
	size?: number;
	isActive?: boolean;
	route: RouteProp<DashboardParamList>;
	onPress?: (route: RouteProp<DashboardParamList>) => void;
}

export const TabBarItem: FC<Props> = ({
	style,
	icon: IconComponent,
	size = 24,
	isActive,
	route,
	onPress,
}) => {
	const scale = useSharedValue(1);
	const opacity = useSharedValue(1);
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ scale: scale.value }],
	}));
	const containerStyle = [styles.container, animatedStyle, style];

	useEffect(() => {
		const nextOpacity = isActive ? 1 : 0.5;
		opacity.value = withSpring(nextOpacity);
	}, [isActive]);

	const handlePress = () => {
		onPress?.(route);
		scale.value = withTiming(
			1.1,
			{
				duration: 50,
				easing: Easing.elastic(1.5),
			},
			() => {
				scale.value = withSpring(1);
			},
		);
	};

	return (
		<AnimatedPressable
			hitSlop={12}
			style={containerStyle}
			onPress={handlePress}
		>
			<IconComponent size={size} />
		</AnimatedPressable>
	);
};

export default TabBarItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
