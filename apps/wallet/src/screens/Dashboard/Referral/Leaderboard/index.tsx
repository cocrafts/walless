import type { FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { ReferralRankingRecord } from '@walless/graphql';
import { Text, View } from '@walless/gui';

import LeaderboardRow from './LeaderboardRow';

interface Props {
	leaderboard: ReferralRankingRecord[];
}

const rankChangeToString = (rankChange: number | null | undefined) => {
	if (!rankChange) {
		return '';
	}
	if (rankChange > 0) {
		return `+${rankChange}`;
	}
	if (rankChange < 0) {
		return `${rankChange}`;
	}
};

const LeaderboardTab: FC<Props> = ({ leaderboard }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Walless Influencers</Text>

			<LeaderboardRow rank="#" display="Account" referralCount="Invitation" />
			<ScrollView>
				{leaderboard.map((record) => (
					<LeaderboardRow
						key={record.id}
						rank={record.rank?.toString() || 'N/A'}
						rankChange={rankChangeToString(record.rankChange)}
						display={record.display || 'Anonymous'}
						referralCount={record.referralCount?.toString() || 'N/A'}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default LeaderboardTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		backgroundColor: '#0694D333',
		fontSize: 16,
		fontWeight: '500',
		color: '#ffffff',
		padding: 8,
		textAlign: 'center',
	},
	property: {
		flex: 1,
	},
});
