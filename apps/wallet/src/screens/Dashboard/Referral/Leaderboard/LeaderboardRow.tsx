import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	style?: ViewStyle;
	display: string;
	rank: string;
	rankChange?: string;
	referralCount: string;
}

const LeaderboardRow: FC<Props> = ({
	style,
	rank,
	rankChange,
	display,
	referralCount,
}) => {
	return (
		<View style={[styles.container, style]}>
			<Text style={styles.property}>
				{rank} {rankChange && `(${rankChange})`}
			</Text>
			<Text style={styles.property} numberOfLines={1} ellipsizeMode="tail">
				{display}
			</Text>
			<Text style={styles.property}>{referralCount}</Text>
		</View>
	);
};

export default LeaderboardRow;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#56667433',
		padding: 4,
		gap: 4,
	},
	property: {
		flex: 1,
		textAlign: 'center',
		fontSize: 16,
		padding: 4,
	},
});
