import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { ViewabilityConfigCallbackPairs, ViewStyle } from 'react-native';
import { FlatList, StyleSheet } from 'react-native';
import type { EdgeInsets } from 'react-native-safe-area-context';
import { logger, runtime } from '@walless/core';
import type { ReferralRank } from '@walless/graphql';
import { queries } from '@walless/graphql';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	SwipeDownGesture,
	Text,
	View,
} from '@walless/gui';
import { Top1, Top2, Top3 } from '@walless/icons';
import { ModalId } from 'modals/types';
import { qlClient } from 'utils/graphql';
import { useSafeAreaInsets } from 'utils/hooks';

import GradientRankingCard from './GradientRankingCard';
import HighestRankingCard from './HighestRankingCard';
import RankingCard from './RankingCard';

interface LeaderboardProps {
	rank: number;
	referralCount: number;
	rankingPercent: number;
	leaderboardSize: number;
	safeAreaInsets: EdgeInsets;
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
	referralCount,
	rankingPercent,
	leaderboardSize,
	config,
}) => {
	const [currentOffset, setCurrentOffset] = useState(0);
	const [rankings, setRankings] = useState<ReferralRank[]>([]);
	const [isMyCardVisible, setIsMyCardVisible] = useState(false);
	const safeAreaInsets = useSafeAreaInsets();

	const safeAreaStyle: ViewStyle = {
		paddingBottom: safeAreaInsets.bottom,
	};

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

	const handleClose = () => {
		modalActions.hide(config.id);
	};

	const MyCard = () => (
		<GradientRankingCard
			style={styles.referralRankingItem}
			rank={rank}
			rankingPercent={rankingPercent}
			totalInvites={referralCount}
		/>
	);

	const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>(
		[
			{
				onViewableItemsChanged: ({ viewableItems }) => {
					const isMyCardVisible = viewableItems.some(
						({ item }) => item.rank === rank,
					);
					setIsMyCardVisible(isMyCardVisible);
				},
				viewabilityConfig: {
					itemVisiblePercentThreshold: 20,
				},
			},
		],
	);

	useEffect(() => {
		fetchMoreRankings();
	}, []);

	return (
		<SwipeDownGesture
			style={[styles.container, safeAreaStyle]}
			callbackOnClose={handleClose}
			gestureEnable={runtime.isMobile}
		>
			<View style={styles.upperPartContainer}>
				<View style={styles.topBar} />

				<Text style={styles.title}>Leaderboard</Text>

				<View style={styles.topRankContainer}>
					{rankings[1] && (
						<HighestRankingCard
							Icon={Top2}
							displayName={rankings[1].displayName || 'Unknown'}
							ranking={2}
							totalInvites={rankings[1].referralCount || 0}
						/>
					)}
					{rankings[0] && (
						<HighestRankingCard
							Icon={Top1}
							displayName={rankings[0].displayName || 'Unknown'}
							ranking={1}
							totalInvites={rankings[0].referralCount || 0}
						/>
					)}
					{rankings[2] && (
						<HighestRankingCard
							Icon={Top3}
							displayName={rankings[2].displayName || 'Unknown'}
							ranking={3}
							totalInvites={rankings[2].referralCount || 0}
						/>
					)}
				</View>
			</View>

			<FlatList
				style={styles.referrerRankingList}
				data={rankings.slice(3)}
				renderItem={({ item }) =>
					item.rank !== rank ? (
						<RankingCard
							style={styles.referralRankingItem}
							ranking={item.rank || 0}
							username={item.displayName || 'Unknown'}
							totalInvites={item.referralCount || 0}
						/>
					) : (
						<MyCard />
					)
				}
				viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
				keyExtractor={(item) => item.id.toString()}
				showsVerticalScrollIndicator={false}
				onEndReached={fetchMoreRankings}
				onEndReachedThreshold={1}
			/>

			{!isMyCardVisible && (
				<View
					style={[
						styles.floatingCard,
						{
							marginBottom: 16 - rankingItemGap + safeAreaInsets.bottom,
						},
					]}
				>
					<MyCard />
				</View>
			)}
		</SwipeDownGesture>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#EBF0F5',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		overflow: 'hidden',
		height: '100%',
	},
	upperPartContainer: {
		backgroundColor: '#19A3E1',
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
	floatingCard: {
		position: 'absolute',
		width: '100%',
		bottom: 0,
		paddingHorizontal: 16,
	},
});

export default LeaderboardModal;

export const showLeaderboard = (props: LeaderboardProps) => {
	modalActions.show({
		id: ModalId.ReferralLeaderBoard,
		component: ({ config }) => <LeaderboardModal config={config} {...props} />,
		animateDirection: AnimateDirections.Top,
		bindingDirection: BindDirections.InnerBottom,
		fullHeight: true,
		positionOffset: {
			y: 40 + props.safeAreaInsets.top,
		},
	});
};
