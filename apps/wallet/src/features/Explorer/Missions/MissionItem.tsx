import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { View } from '@walless/gui';
import { Chair, InfoIcon, MissionBackground } from '@walless/icons';

interface MissionProps {
	id: string;
	title: string;
	colors?: string[];
	onPress?: () => void;
}

const MissionItem: FC<MissionProps> = ({ title, onPress, id, colors }) => {
	return (
		<Animated.View style={[styles.container]}>
			<View style={styles.missionBackground}>
				<MissionBackground colors={colors} id={id} />
			</View>
			<View style={styles.header}>
				<View style={styles.iconContainer}>
					<Chair color="#23303C" size={16} />
				</View>

				<InfoIcon />
			</View>
			<Text style={styles.text}>{title}</Text>
			<TouchableOpacity style={styles.button} onPress={onPress}>
				<Text style={styles.textButton}>Claim</Text>
			</TouchableOpacity>
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
		paddingVertical: 5,
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
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: '#ffffff',
	},
	textButton: {
		color: '#23303C',
		fontSize: 12,
	},
	missionBackground: {
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: -1,
	},
});
