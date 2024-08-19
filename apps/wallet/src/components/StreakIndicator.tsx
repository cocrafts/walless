import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

interface Props {
	currentStreak: number;
	streak: number;
}

const StreakIndicator: FC<Props> = ({ currentStreak, streak }) => {
	return (
		<View style={styles.container}>
			{Array.from({ length: streak }, (_, i) => i + 1).map((streakIndex) => (
				<View
					key={streakIndex}
					style={[
						styles.streakCircle,
						streakIndex <= currentStreak
							? styles.activeCircle
							: styles.inactiveCircle,
					]}
				/>
			))}
		</View>
	);
};

export default StreakIndicator;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	streakCircle: {
		width: 10,
		height: 10,
		borderRadius: 5,
	},
	inactiveCircle: {
		borderWidth: 1,
		borderColor: '#798896',
	},
	activeCircle: {
		backgroundColor: '#17A3E1',
	},
});
