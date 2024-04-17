import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

interface Props {
	style?: ViewStyle;
	currentStreak: number;
	streak: number;
}

const StreakBar: FC<Props> = ({ style, currentStreak, streak }) => {
	return (
		<View style={[styles.container, style]}>
			{Array.from({ length: streak }, (_, i) => (
				<View
					key={i}
					style={[styles.bar, i < currentStreak && styles.activeBar]}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
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
});

export default StreakBar;
