import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { queries, type ReferralRank } from '@walless/graphql';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	Text,
	View,
} from '@walless/gui';
import { Top1, Top2, Top3 } from '@walless/icons';
import { ModalId } from 'modals/types';
import { qlClient } from 'utils/graphql';

import HighestRankingCard from './HighestRankingCard';
import RankingCard from './RankingCard';

interface LeaderboardProps {
	rankingPercent: number;
}

type Props = LeaderboardProps & {
	config: ModalConfigs;
};

const LeaderboardModal: FC<Props> = ({ rankingPercent }) => {
	const [rankings, setRankings] = useState<ReferralRank[]>([]);

	useEffect(() => {
		const fetchReferralRankings = async () => {
			const { referralLeaderboard } = await qlClient.request<{
				referralLeaderboard: ReferralRank[];
			}>(queries.referralLeaderboard, {
				limit: 10,
				offset: 0,
			});

			setRankings(referralLeaderboard ? referralLeaderboard : []);
		};

		fetchReferralRankings();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.topBar} />

			<View>
				<Text style={styles.title}>Leaderboard</Text>
				<Text style={styles.subtext}>You are in Top {rankingPercent}%</Text>
			</View>

			<View style={styles.topRankContainer}>
				{rankings[1] && (
					<HighestRankingCard
						Icon={Top2}
						displayName={rankings[1].displayName || 'Unknown'}
						ranking={2}
						totalInvitations={rankings[1].referralCount || 0}
					/>
				)}
				{rankings[0] && (
					<HighestRankingCard
						Icon={Top1}
						displayName={rankings[0].displayName || 'Unknown'}
						ranking={1}
						totalInvitations={rankings[0].referralCount || 0}
					/>
				)}
				{rankings[2] && (
					<HighestRankingCard
						Icon={Top3}
						displayName={rankings[2].displayName || 'Unknown'}
						ranking={3}
						totalInvitations={rankings[2].referralCount || 0}
					/>
				)}
			</View>

			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.referrerRankingList}>
					{rankings.slice(3).map((item) => (
						<RankingCard
							key={item.id}
							ranking={item.rank || 0}
							username={item.displayName || 'Unknown'}
							totalInvites={item.referralCount || 0}
						/>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#19A3E1',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		gap: 16,
	},
	topBar: {
		backgroundColor: '#131C24',
		borderRadius: 4,
		height: 8,
		width: 64,
		alignSelf: 'center',
		marginTop: 8,
	},
	title: {
		color: '#ffffff',
		fontSize: 16,
		textAlign: 'center',
	},
	subtext: {
		color: '#FFFFFF80',
		textAlign: 'center',
	},
	topRankContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		alignSelf: 'center',
	},
	referrerRankingList: {
		backgroundColor: '#EBF0F5',
		padding: 16,
		gap: 12,
	},
	scrollView: {
		maxHeight: 300,
	},
});

export default LeaderboardModal;

export const showLeaderboard = (props: LeaderboardProps) => {
	modalActions.show({
		id: ModalId.LeaderBoard,
		component: ({ config }) => <LeaderboardModal config={config} {...props} />,
		animateDirection: AnimateDirections.Top,
		bindingDirection: BindDirections.InnerBottom,
		fullWidth: true,
	});
};
