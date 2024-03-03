import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import type { ReferralRankings } from '@walless/graphql';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	Text,
	View,
} from '@walless/gui';
import { ModalId } from 'modals/types';

import HighestRankingCard from './HighestRankingCard';
import { mockRankingList } from './internal';
import RankingCard from './RankingCard';

interface LeaderBoardProps {
	rankings: ReferralRankings[];
	rankingPercent: number;
}

type Props = LeaderBoardProps & {
	config: ModalConfigs;
};

const LeaderBoardModal: FC<Props> = ({ rankingPercent, rankings }) => {
	return (
		<View style={styles.container}>
			<View style={styles.topBar} />

			<View>
				<Text style={styles.title}>LeaderBoard</Text>
				<Text style={styles.subtext}>You are in Top {rankingPercent}%</Text>
			</View>

			<View style={styles.topRankContainer}>
				{rankings[1] && (
					<HighestRankingCard
						avatar={rankings[1].displayName || 'Unknown'}
						ranking={2}
						totalInvitations={rankings[1].referralCount || 0}
					/>
				)}
				{rankings[0] && (
					<HighestRankingCard
						avatar={rankings[0].displayName || 'Unknown'}
						ranking={1}
						totalInvitations={rankings[0].referralCount || 0}
					/>
				)}
				{rankings[2] && (
					<HighestRankingCard
						avatar={rankings[2].displayName || 'Unknown'}
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
					{rankings.slice(3, mockRankingList.length).map((item) => (
						<RankingCard
							key={item.id}
							avatar={item.displayName || 'Unknown'}
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

export default LeaderBoardModal;

export const showLeaderBoard = (props: LeaderBoardProps) => {
	modalActions.show({
		id: ModalId.LeaderBoard,
		component: ({ config }) => <LeaderBoardModal config={config} {...props} />,
		animateDirection: AnimateDirections.Top,
		bindingDirection: BindDirections.InnerBottom,
		fullWidth: true,
	});
};
