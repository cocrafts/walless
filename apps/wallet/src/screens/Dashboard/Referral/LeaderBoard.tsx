import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { logger } from '@walless/core';
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
	rank: number;
	rankingPercent: number;
	leaderboardSize: number;
}

type Props = LeaderboardProps & {
	config: ModalConfigs;
};

const rankingItemGap = 10;
const rankingItemHeight = 48;
const itemsPerPage = 10;

const fetchReferralRankings = async (limit: number, offset: number) => {
	const { referralLeaderboard } = await qlClient.request<{
		referralLeaderboard: ReferralRank[];
	}>(queries.referralLeaderboard, {
		limit,
		offset,
	});

	return referralLeaderboard;
};

const LeaderboardModal: FC<Props> = ({
	rank,
	rankingPercent,
	leaderboardSize,
}) => {
	const [currentOffset, setCurrentOffset] = useState(0);
	const [rankings, setRankings] = useState<ReferralRank[]>([]);

	const fetchMoreRankings = async () => {
		try {
			if (currentOffset < leaderboardSize) {
				const newRankings = await fetchReferralRankings(
					itemsPerPage,
					currentOffset,
				);
				setRankings([...rankings, ...newRankings]);
				setCurrentOffset(currentOffset + newRankings.length);
			}
		} catch (error) {
			logger.error('Error fetching referral rankings', error);
		}
	};

	useEffect(() => {
		fetchMoreRankings();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.topBar} />

			<Text style={styles.title}>Leaderboard</Text>

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

			<FlatList
				style={styles.referrerRankingList}
				data={rankings.slice(3)}
				renderItem={({ item }) => (
					<RankingCard
						style={styles.referralRankingItem}
						ranking={item.rank || 0}
						username={item.displayName || 'Unknown'}
						totalInvites={item.referralCount || 0}
					/>
				)}
				keyExtractor={(item) => item.id.toString()}
				showsVerticalScrollIndicator={false}
				onEndReached={fetchMoreRankings}
				onEndReachedThreshold={1}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#19A3E1',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	topBar: {
		backgroundColor: '#131C24',
		borderRadius: 4,
		height: 8,
		width: 64,
		alignSelf: 'center',
		marginTop: 8,
		marginBottom: 16,
	},
	title: {
		color: '#ffffff',
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 16,
	},
	subtext: {
		color: '#FFFFFF80',
		textAlign: 'center',
	},
	topRankContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		alignSelf: 'center',
		width: '80%',
	},
	referrerRankingList: {
		backgroundColor: '#EBF0F5',
		paddingTop: 16,
		paddingBottom: 16 - rankingItemGap,
		paddingHorizontal: 16,
		maxHeight: rankingItemHeight * 5 + rankingItemGap * 4,
	},
	referralRankingItem: {
		height: rankingItemHeight,
		marginBottom: rankingItemGap,
	},
});

export default LeaderboardModal;

export const showLeaderboard = (props: LeaderboardProps) => {
	modalActions.show({
		id: ModalId.LeaderBoard,
		component: ({ config }) => <LeaderboardModal config={config} {...props} />,
		animateDirection: AnimateDirections.Top,
		bindingDirection: BindDirections.InnerBottom,
	});
};
