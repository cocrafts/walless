import { type FC, useEffect } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSpring,
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
		const nextScale = isActive ? 1 : 0.95;
		const velocity = isActive ? 3 : 0;
		const nextOpacity = isActive ? 1 : 0.5;
		scale.value = withRepeat(withSpring(nextScale, { velocity }), 2, true);
		opacity.value = withSpring(nextOpacity);
	}, [isActive]);

	return (
		<AnimatedPressable
			hitSlop={12}
			style={containerStyle}
			onPress={() => onPress?.(route)}
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
