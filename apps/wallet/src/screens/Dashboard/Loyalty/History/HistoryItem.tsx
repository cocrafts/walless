import type { FC } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import type { TaskRecord } from '@walless/graphql';
import { TaskType, VerifyMechanism } from '@walless/graphql';
import { loyaltyTask } from '@walless/graphql/query';
import { Text } from '@walless/gui';
import { loyaltyState } from 'state/loyalty';
import { qlClient } from 'utils/graphql';
import { colors, sharedStyles } from 'utils/style';

interface Props {
	taskRecord: TaskRecord;
}

const HistoryItem: FC<Props> = ({ taskRecord }) => {
	const { data: task, isLoading } = useQuery({
		queryFn: async () => {
			if (!loyaltyState.taskMap[taskRecord.taskId]) {
				const { loyaltyTask: task } = await qlClient.request(loyaltyTask, {
					id: taskRecord.taskId,
				});

				if (task) {
					loyaltyState.taskMap[taskRecord.taskId] = task;
				} else {
					loyaltyState.taskMap[taskRecord.taskId] = {
						id: taskRecord.taskId,
						metadata: {
							name: `Deleted task (${taskRecord.taskId.slice(
								0,
								4,
							)}...${taskRecord.taskId.slice(-4)})`,
						},
						type: TaskType.Onetime,
						mechanism: VerifyMechanism.No,
						points: 0,
					};
				}
			}

			return loyaltyState.taskMap[taskRecord.taskId];
		},
		queryKey: [taskRecord.taskId],
	});

	if (isLoading) {
		return <ActivityIndicator style={styles.loadingContainer} />;
	}

	if (!task) return null;

	return (
		<View style={styles.historyItemContainer}>
			<Text style={sharedStyles.fontSize15}>
				{task.metadata['name'] ?? 'Unknown task'}
			</Text>

			<View style={sharedStyles.flexRowBetween}>
				<Text style={[sharedStyles.fontSize13, sharedStyles.textNeutral5]}>
					{new Date(taskRecord.timestamp).toLocaleString()}
				</Text>
				{task.points > 0 && (
					<Text style={styles.pointsText}>+{task.points}</Text>
				)}
			</View>

			<View style={sharedStyles.flexRowBetween}>
				<Text style={[sharedStyles.fontSize13, sharedStyles.textNeutral5]}>
					Project
				</Text>
				<Text>{task.metadata['partner'] ?? 'Walless'}</Text>
			</View>
		</View>
	);
};

export default HistoryItem;

const styles = StyleSheet.create({
	loadingContainer: {
		paddingVertical: 20,
	},
	historyItemContainer: {
		paddingTop: 20,
		paddingBottom: 24,
		paddingHorizontal: 16,
		gap: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#202D38',
	},
	pointsText: {
		...sharedStyles.fontSize13,
		color: colors.success,
	},
});
