import type { FC } from 'react';
import type { Insets } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { ChevronLeft, Hamburger } from '@walless/icons';

export interface HeaderProps {
	insets: Insets;
	title: string;
	scrollOffset: SharedValue<number>;
	onToggleDrawer?: () => void;
	onGoBack?: () => void;
}

export const StackHeader: FC<HeaderProps> = ({
	insets,
	title,
	scrollOffset,
	onToggleDrawer,
	onGoBack,
}) => {
	const backgroundColor = useSharedValue('transparent');
	const animatedStyle = useAnimatedStyle(() => {
		const bgOpacity = interpolate(scrollOffset.value, [0, 160], [0, 1]);
		backgroundColor.value = `rgba(8, 16, 22, ${bgOpacity})`;

		return {
			paddingTop: insets.top || 0,
			backgroundColor: backgroundColor.value,
		};
	}, [scrollOffset, insets]);

	const showIcon = !!onToggleDrawer || !!onGoBack;
	const handlePressIcon = onToggleDrawer ? onToggleDrawer : onGoBack;
	const Icon = onToggleDrawer ? Hamburger : ChevronLeft;

	return (
		<Animated.View style={[styles.container, animatedStyle]}>
			<View style={styles.textContainer}>
				{showIcon && (
					<TouchableOpacity
						hitSlop={24}
						style={styles.burger}
						onPress={handlePressIcon}
					>
						<Icon size={18} color="white" />
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
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	textContainer: {
		marginTop: 16,
		marginBottom: 12,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		opacity: 0.8,
	},
	burger: {
		zIndex: 1,
		padding: 4,
	},
	text: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default StackHeader;
