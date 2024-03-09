import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	ranking: number;
	totalInvites: number;
	username: string;
}

const RankingCard: FC<Props> = ({ ranking, totalInvites, username }) => {
	return (
		<View style={styles.container}>
			<View style={[styles.rowDirection, styles.leftGap]}>
				<Text style={styles.text}>{ranking}</Text>
				<Text style={styles.text}>{username}</Text>
			</View>
			<View style={[styles.rowDirection, styles.rightGap]}>
				<Text style={styles.invitesText}>{totalInvites}</Text>
				<Text style={styles.text}>Invites</Text>
			</View>
		</View>
	);
};

export default RankingCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		gap: 8,
	},
	text: {
		color: '#19232C',
	},
	invitesText: {
		color: '#19A3E1',
	},
	rowDirection: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	leftGap: {
		gap: 12,
	},
	rightGap: {
		gap: 4,
	},
});
