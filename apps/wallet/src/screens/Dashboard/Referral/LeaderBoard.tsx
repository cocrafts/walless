import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
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
	rankingPercent: number;
}

type Props = LeaderBoardProps & {
	config: ModalConfigs;
};

const LeaderBoardModal: FC<Props> = ({ rankingPercent }) => {
	const top1 = mockRankingList[0];
	const top2 = mockRankingList[1];
	const top3 = mockRankingList[2];

	return (
		<View style={styles.container}>
			<View style={styles.topBar} />

			<View>
				<Text style={styles.title}>LeaderBoard</Text>
				<Text style={styles.subtext}>You are in Top {rankingPercent}%</Text>
			</View>

			<View style={styles.topRankContainer}>
				<HighestRankingCard
					avatar={top2.username}
					ranking={top2.rank}
					totalInvities={top2.points}
				/>
				<HighestRankingCard
					avatar={top1.username}
					ranking={top1.rank}
					totalInvities={top1.points}
				/>
				<HighestRankingCard
					avatar={top3.username}
					ranking={top3.rank}
					totalInvities={top3.points}
				/>
			</View>

			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.referrerRankingList}>
					{mockRankingList
						.slice(3, mockRankingList.length)
						.map((item, index) => (
							<RankingCard
								key={index}
								avatar={item.username}
								ranking={item.rank}
								username={item.username}
								totalInvities={item.points}
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
