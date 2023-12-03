import type { FC } from 'react';
import type { Insets } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { ChevronLeft, Hamburger } from '@walless/icons';

export interface HeaderProps {
	insets: Insets;
	title: string;
	showIcon?: boolean;
	scrollOffset: SharedValue<number>;
	toggleDrawer?: () => void;
	goBack?: () => void;
}

export const StackHeader: FC<HeaderProps> = ({
	insets,
	title,
	showIcon,
	scrollOffset,
	toggleDrawer,
	goBack,
}) => {
	const backgroundColor = useSharedValue('transparent');
	const animatedStyle = useAnimatedStyle(() => {
		const bgOpacity = interpolate(scrollOffset.value, [0, 160], [0, 1]);
		backgroundColor.value = `rgba(8, 16, 22, ${bgOpacity})`;

		return {
			paddingTop: Math.max(insets.top || 0, 16),
			backgroundColor: backgroundColor.value,
		};
	});

	const handlePressIcon = toggleDrawer ? toggleDrawer : goBack;
	const Icon = toggleDrawer ? Hamburger : ChevronLeft;

	return (
		<Animated.View style={[styles.container, animatedStyle]}>
			<View style={styles.textContainer}>
				{showIcon && (
					<TouchableOpacity hitSlop={16} onPress={handlePressIcon}>
						<Icon size={14} />
					</TouchableOpacity>
				)}
				<Text style={styles.text}>{title}</Text>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#081016',
		paddingBottom: 12,
		paddingLeft: 18,
	},
	textContainer: {
		marginTop: 6,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		opacity: 0.8,
	},
	text: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default StackHeader;
