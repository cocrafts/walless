import type { FC } from 'react';
import { useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { Task } from '@walless/graphql';
import { TaskType } from '@walless/graphql';
import { Text } from '@walless/gui';
import { sharedStyles } from 'utils/style';

interface Props {
	containerStyle?: ViewStyle;
	tasks: Task[];
}

interface TaskByTypeProps {
	name: string;
	tasks: Task[];
}

const TasksByType: FC<Props> = ({ containerStyle, tasks }) => {
	const categorizedTasks = useMemo(() => {
		const onetimeTasks: Task[] = [];
		const recurringTasks: Task[] = [];
		const streakTasks: Task[] = [];

		tasks.forEach((task) => {
			switch (task.type) {
				case TaskType.Onetime:
					onetimeTasks.push(task);
					break;
				case TaskType.Recurring:
					recurringTasks.push(task);
					break;
				case TaskType.Streak:
					streakTasks.push(task);
					break;
			}
		});

		const tasksByType: TaskByTypeProps[] = [
			{
				name: 'One-time',
				tasks: onetimeTasks,
			},
			{
				name: 'Daily Tasks',
				tasks: recurringTasks,
			},
			{
				name: 'Streak',
				tasks: streakTasks,
			},
		];

		return tasksByType;
	}, [tasks]);

	return (
		<View style={[styles.containter, containerStyle]}>
			{categorizedTasks.map((taskByType) => {
				if (taskByType.tasks.length === 0) return null;

				return (
					<View key={taskByType.name} style={styles.taskByTypeContainer}>
						<Text style={styles.typeText}>{taskByType.name}</Text>
					</View>
				);
			})}
		</View>
	);
};

export default TasksByType;

const styles = StyleSheet.create({
	containter: {
		gap: 24,
	},
	taskByTypeContainer: {
		gap: 12,
	},
	typeText: {
		...sharedStyles.textNeutral6,
	},
});
