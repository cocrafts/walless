import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	avatar: string;
	ranking: number;
	totalInvitations: number;
}

const HighestRankingCard: FC<Props> = ({ ranking, totalInvitations }) => {
	const rankingColor =
		ranking === 1 ? '#7ED7FF' : ranking === 2 ? '#FFB803' : '#1CCF84';

	const avatarStyle = {
		width: 8 * (11 - ranking),
		height: 8 * (11 - ranking),
		borderColor: rankingColor,
	};

	const invitesContainerStyle = {
		paddingVertical: 6 * (5 - ranking),
	};

	const invitesContainerOfTop1 = {
		backgroundColor: '#19232C',
	};

	return (
		<View style={styles.container}>
			<View style={styles.container}>
				<Image
					style={[styles.avatar, avatarStyle]}
					source={{ uri: 'https://picsum.photos/200' }}
				/>
				<View
					style={[
						styles.container,
						styles.rankingContainer,
						{ backgroundColor: rankingColor },
					]}
				>
					<Text>{ranking}</Text>
				</View>
			</View>

			<View
				style={[
					styles.invitesContainer,
					invitesContainerStyle,
					ranking === 1 && invitesContainerOfTop1,
				]}
			>
				<Text>{totalInvitations} Invites</Text>
			</View>
		</View>
	);
};

export default HighestRankingCard;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		borderRadius: 50,
		borderWidth: 4,
	},
	rankingContainer: {
		height: 20,
		width: 20,
		borderRadius: 10,
		marginTop: -12,
	},
	invitesContainer: {
		borderTopWidth: 4,
		backgroundColor: '#202D38',
		borderTopColor: '#32404B',
		paddingHorizontal: 12,
		marginTop: 8,
	},
});
