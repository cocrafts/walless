import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	withSpring,
} from 'react-native-reanimated';
import { Button, Text, View } from '@walless/gui';
import { Chair, InfoIcon, MissionBackground } from '@walless/icons';

interface MissionProps {
	title: string;
	colors?: string[];
	onPress?: () => void;
}

const MissionItem: FC<MissionProps> = ({ title, onPress, colors }) => {
	return (
		<Animated.View style={[styles.container]}>
			<View style={styles.misstionBackground}>
				<MissionBackground colors={colors} />
			</View>
			<View style={styles.header}>
				<View style={styles.iconContainer}>
					<Chair color="#23303C" size={16} />
				</View>

				<InfoIcon />
			</View>
			<Text style={styles.text}>{title}</Text>
			<Button style={styles.button} onPress={onPress}>
				<Text style={styles.textButton}>Claim</Text>
			</Button>
		</Animated.View>
	);
};

export default MissionItem;

const styles = StyleSheet.create({
	container: {
		width: 120,
		height: 105,
		borderRadius: 10,
		justifyContent: 'space-between',
		paddingHorizontal: 6,
		paddingVertical: 9,
		marginHorizontal: 5,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	iconContainer: {
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
		width: 25,
		height: 25,
		borderRadius: 25,
	},
	button: {
		width: 60,
		height: 25,
		borderRadius: 6,
		backgroundColor: '#ffffff',
	},
	text: {
		color: '#ffffff',
	},
	textButton: {
		color: '#23303C',
		fontSize: 12,
	},
	misstionBackground: {
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: -1,
	},
});
