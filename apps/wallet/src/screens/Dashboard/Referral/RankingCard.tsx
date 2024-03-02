import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	avatar: string;
	ranking: number;
	totalInvities: number;
	username: string;
}

const RankingCard: FC<Props> = ({ ranking, totalInvities, username }) => {
	return (
		<View style={styles.container}>
			<View style={styles.rowDirection}>
				<Text style={styles.text}>{ranking}</Text>
				<Image
					style={styles.avatar}
					source={{ uri: 'https://picsum.photos/200' }}
				/>
				<Text style={styles.text}>{username}</Text>
			</View>
			<View style={styles.rowDirection}>
				<Text style={styles.invitiesText}>{totalInvities}</Text>
				<Text style={styles.text}>Invities</Text>
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
	avatar: {
		width: 32,
		height: 32,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: '#CFCFCF',
	},
	text: {
		color: '#19232C',
	},
	invitiesText: {
		color: '#19A3E1',
	},
	rowDirection: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
});
