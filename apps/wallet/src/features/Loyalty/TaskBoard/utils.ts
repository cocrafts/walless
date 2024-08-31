import type { Task } from '@walless/graphql';
import { TaskType } from '@walless/graphql';

interface CategorizedTask {
	name: string;
	tasks: Task[];
}

export const categorizeTasks = (
	tasks: Task[],
	completedOnetimeTaskMap: Record<string, boolean>,
) => {
	const data: CategorizedTask[] = [
		{
			name: 'Social Quests',
			tasks: [],
		},
		{
			name: 'Daily Tasks',
			tasks: [],
		},
		{
			name: 'Streak',
			tasks: [],
		},
	];

	tasks.forEach((task) => {
		switch (task.type) {
			case TaskType.Onetime:
				if (completedOnetimeTaskMap && !completedOnetimeTaskMap[task.id]) {
					data[0].tasks.push(task);
				}
				break;
			case TaskType.Recurring:
				data[1].tasks.push(task);
				break;
			case TaskType.Streak:
				data[2].tasks.push(task);
				break;
			default:
				break;
		}
	});

	return data;
};
