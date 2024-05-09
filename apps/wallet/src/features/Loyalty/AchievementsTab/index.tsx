import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import type {
	Action,
	ActionCount,
	ActionRecord,
	UserProgress,
} from '@walless/graphql';
import { ActionCategory, queries } from '@walless/graphql';
import { groupBy } from 'lodash';
import { qlClient } from 'utils/graphql';

import ActionCard from './ActionCard';
import { getCycleEndTime } from './internal';

interface Props {
	userProgress?: UserProgress;
}

const AchievementsTab: FC<Props> = ({ userProgress }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [actions, setActions] = useState<Action[]>([]);

	useEffect(() => {
		const fetchActiveActions = async () => {
			setIsLoading(true);

			const { loyaltyActiveActions } = await qlClient.request<{
				loyaltyActiveActions: Action[];
			}>(queries.loyaltyActiveActions);

			const typeGroupedActions = groupBy(loyaltyActiveActions, 'type');

			const sortedActions = Object.values(typeGroupedActions)
				.map((actions) =>
					actions.sort((a, b) => (a.points || 0) - (b.points || 0)),
				)
				.flat();

			setActions(sortedActions);
		};

		fetchActiveActions()
			.catch(console.error)
			.finally(() => setIsLoading(false));
	}, []);

	const canUserPerformAction = (action: Action) => {
		if (!userProgress) {
			return false;
		}

		if (
			action.category === ActionCategory.Onetime ||
			action.category === ActionCategory.Milestone
		) {
			return !(userProgress.actionRecords as ActionRecord[]).some(
				(record) => record.actionId === action.id,
			);
		}

		if (action.category === ActionCategory.Recurring) {
			if (!action.cycleInHours) {
				return true;
			}

			const lastRecord = (
				userProgress.actionRecords as ActionRecord[]
			).findLast((record) => record.actionId === action.id);
			if (!lastRecord) {
				return true;
			}

			const cycleEndTime = getCycleEndTime(
				new Date(lastRecord.timestamp),
				action.cycleInHours,
			);

			return new Date() >= cycleEndTime;
		}

		if (action.category === ActionCategory.Streak) {
			const actionCount = userProgress.trackList?.find(
				(track) => (track as ActionCount).type === action.type,
			);
			if (!actionCount || !actionCount.cycleInHours) {
				return true;
			}

			const cycleEndTime = getCycleEndTime(
				new Date(actionCount.lastClaim),
				actionCount.cycleInHours as number,
			);

			return new Date() >= cycleEndTime;
		}

		return false;
	};

	if (isLoading)
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator size="large" />
			</View>
		);

	return (
		<View style={styles.container}>
			{actions.length === 0 && (
				<View style={styles.centerContainer}>
					<Text style={styles.noTaskText}>
						There is no available tasks, please comeback later!
					</Text>
				</View>
			)}

			{actions.map((action) => (
				<ActionCard
					key={action.id}
					action={action}
					canUserPerformAction={canUserPerformAction(action)}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 8,
	},
	centerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noTaskText: {
		color: 'white',
		textAlign: 'center',
	},
});

export default AchievementsTab;
