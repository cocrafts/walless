import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	style?: ViewStyle;
	ranking: string;
	account: string;
	invitation: string;
	isIncremental?: boolean;
	isDecremental?: boolean;
}

const LeaderboardRow: FC<Props> = ({ style, ranking, account, invitation }) => {
	return (
		<View style={[styles.container, style]}>
			<Text style={styles.property}>{ranking}</Text>
			<Text style={styles.property}>{account}</Text>
			<Text style={styles.property}>{invitation}</Text>
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
		alignSelf: 'center',
		fontSize: 16,
		padding: 4,
	},
});
