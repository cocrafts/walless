import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Heart } from '@walless/icons';

interface LoveAndActiveCountProps {
	loveCount: number;
	activeCount: number;
}

const LoveAndActiveCount: FC<LoveAndActiveCountProps> = ({
	loveCount,
	activeCount,
}) => {
	return (
		<View style={styles.loveAndActiveContainer}>
			<View style={styles.loveAndActiveDisplay}>
				<Heart colors={['#D93737', '#D93737']} size={12} />
				<Text style={styles.loveText}>{loveCount}</Text>
			</View>
			<View style={styles.loveAndActiveDisplay}>
				<View style={styles.activeIcon} />
				<Text style={styles.activeText}>{activeCount}</Text>
			</View>
		</View>
	);
};

export default LoveAndActiveCount;

const styles = StyleSheet.create({
	loveAndActiveContainer: {
		flexDirection: 'row',
		gap: 10,
	},
	loveAndActiveDisplay: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	activeIcon: {
		width: 10,
		height: 10,
		borderRadius: 6,
		backgroundColor: '#37B681',
	},
	activeText: {
		color: '#37B681',
		fontSize: 10,
	},
	loveText: {
		color: '#4E5C69',
		fontSize: 10,
	},
});
