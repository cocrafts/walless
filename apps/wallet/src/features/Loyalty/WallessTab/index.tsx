import { StyleSheet, Text, View } from 'react-native';
import type { Action, ActionCount, ActionRecord } from '@walless/graphql';
import { ActionCategory } from '@walless/graphql';
import { loyaltyState } from 'state/loyalty';
import { useSnapshot } from 'utils/hooks';

import ActionCard from '../ActionCard';
import { getCycleEndTime } from '../ActionCard/internal';

const WallessTab = () => {
	const { userProgress, wallessActions } = useSnapshot(loyaltyState);

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

	return (
		<View style={styles.container}>
			{wallessActions.length === 0 && (
				<View style={styles.centerContainer}>
					<Text style={styles.noTaskText}>
						There is no available tasks, please comeback later!
					</Text>
				</View>
			)}

			{wallessActions.map((action) => (
				<ActionCard
					key={action.id}
					action={action as Action}
					canUserPerformAction={canUserPerformAction(action as Action)}
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

export default WallessTab;
