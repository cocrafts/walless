import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { Action, Progress, Record } from '@walless/graphql';
import { ActionCategory, queries } from '@walless/graphql';
import { qlClient } from 'utils/graphql';

import ActionCard from './ActionCard';
import { getCycleEndTime } from './internal';

interface Props {
	progress?: Progress;
}

const AchievementsTab: FC<Props> = ({ progress }) => {
	const [actions, setActions] = useState<Action[]>([]);

	useEffect(() => {
		const fetchActiveActions = async () => {
			const { loyaltyActiveActions } = await qlClient.request<{
				loyaltyActiveActions: Action[];
			}>(queries.loyaltyActiveActions);

			return loyaltyActiveActions;
		};

		try {
			fetchActiveActions().then((activeActions) => {
				setActions(activeActions);
			});
		} catch (error) {
			console.error(error);
		}
	}, []);

	const canUserPerformAction = (action: Action) => {
		if (!progress) {
			return false;
		}

		if (
			action.category === ActionCategory.Onetime ||
			action.category === ActionCategory.Milestone
		) {
			return !(progress.records as Record[]).some(
				(record) => record.actionId === action.id,
			);
		}

		if (action.category === ActionCategory.Recurring) {
			if (!action.cycleInHours) {
				return true;
			}

			const lastRecord = (progress.records as Record[]).findLast(
				(record) => record.actionId === action.id,
			);
			if (!lastRecord) {
				return true;
			}

			const cycleEndTime = getCycleEndTime(
				new Date(lastRecord.timestamp),
				action.cycleInHours,
			);

			return new Date() >= cycleEndTime;
		}

		return false;
	};

	return (
		<View style={styles.container}>
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
		gap: 8,
	},
});

export default AchievementsTab;
