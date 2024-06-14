import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
	style?: ViewStyle;
	currentStreak: number;
	streak: number;
	isRecorded: boolean;
}

const StreakBar: FC<Props> = ({ style, currentStreak, streak, isRecorded }) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.streakContainer}>
				{Array.from({ length: streak }, (_, i) => (
					<View
						key={i}
						style={[styles.bar, i < currentStreak && styles.activeBar]}
					/>
				))}
			</View>

			<View style={styles.textContainer}>
				<Text style={styles.text}>{isRecorded ? 'Recorded streak' : ''}</Text>
				<Text style={styles.text}>{`${currentStreak}/${streak}`}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 4,
	},
	streakContainer: {
		flexDirection: 'row',
		gap: 4,
	},
	bar: {
		height: 3,
		borderRadius: 4,
		flex: 1,
		backgroundColor: '#515151',
	},
	activeBar: {
		backgroundColor: '#00B1FF',
	},
	textContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	text: {
		fontSize: 10,
		color: '#A4B3C1',
	},
});

export default StreakBar;
