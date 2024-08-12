import type { FC } from 'react';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import type { Task } from '@walless/graphql';
import { TaskType } from '@walless/graphql';
import { loyaltyTaskRecords } from '@walless/graphql/query';
import { Text } from '@walless/gui';
import { qlClient } from 'utils/graphql';
import { sharedStyles } from 'utils/style';

import TaskCard from './TaskCard';
import { categorizeTasks } from './utils';

interface Props {
	tasks: Task[];
}

const CategorizedTasks: FC<Props> = ({ tasks }) => {
	const { data: completedOnetimeTaskMap } = useQuery({
		queryKey: [],
		queryFn: async () => {
			const completedOnetimeTaskMap: Record<string, boolean> = {};
			for (const task of tasks) {
				if (
					task.type === TaskType.Onetime &&
					!completedOnetimeTaskMap[task.id]
				) {
					const records = await qlClient.request(loyaltyTaskRecords, {
						taskId: task.id,
					});
					completedOnetimeTaskMap[task.id] = records.loyaltyTaskRecords
						? records.loyaltyTaskRecords.length > 0
						: false;
				}
			}
			return completedOnetimeTaskMap;
		},
	});

	const categorizedTasks = useMemo(
		() => categorizeTasks(tasks, completedOnetimeTaskMap || {}),
		[completedOnetimeTaskMap, tasks],
	);

	return (
		<View style={styles.container}>
			{categorizedTasks.map((categorizedTask) => {
				if (categorizedTask.tasks.length === 0) return null;
				return (
					<View key={categorizedTask.name} style={styles.taskContainer}>
						<Text style={sharedStyles.textNeutral6}>
							{categorizedTask.name}
						</Text>
						{categorizedTask.tasks.map((task) => (
							<TaskCard key={task.id} task={task} />
						))}
					</View>
				);
			})}
		</View>
	);
};

export default CategorizedTasks;

export const styles = StyleSheet.create({
	container: {
		gap: 24,
	},
	taskContainer: {
		gap: 12,
	},
});
