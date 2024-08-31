import type { FC } from 'react';
import { useMemo, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { Task } from '@walless/graphql';
import { sharedStyles } from 'utils/style';

import CategorizedTasks from './CategorizedTasks';
import TabSelect from './TabSelect';

interface Props {
	containerStyle?: ViewStyle;
	tasks: Task[];
}

enum Tab {
	Walless = 'Walless',
	Partner = 'Partner',
}

const TaskBoard: FC<Props> = ({ containerStyle, tasks }) => {
	const [activeTab, setActiveTab] = useState<Tab>(Tab.Walless);

	const taskByPartner = useMemo(() => {
		const wallessTasks: Task[] = [];
		const partnerTaskMap: Record<string, Task[]> = {};

		tasks.forEach((task) => {
			const partnerId = task.metadata['partnerId'];
			if (partnerId) {
				partnerTaskMap[partnerId] = [
					...(partnerTaskMap[partnerId] || []),
					task,
				];
			} else {
				wallessTasks.push(task);
			}
		});

		return {
			wallessTasks,
			partnerTaskMap,
		};
	}, [tasks]);

	return (
		<View style={[styles.container, containerStyle]}>
			<TabSelect
				tabs={[Tab.Walless, Tab.Partner]}
				activeTab={activeTab}
				onTabPress={(tab) => setActiveTab(tab as Tab)}
			/>

			{activeTab === Tab.Walless ? (
				<CategorizedTasks tasks={taskByPartner.wallessTasks} />
			) : null}
		</View>
	);
};

export default TaskBoard;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#131C24',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		padding: 16,
		gap: 24,
	},
	tabContainer: {
		paddingBottom: 4,
		borderBottomWidth: 1,
		borderColor: 'transparent',
	},
	activeTabContainer: {
		borderColor: '#17A3E1',
	},
	activeTabText: {
		...sharedStyles.fontSize13,
		fontWeight: '500',
	},
	inactiveTabText: {
		...sharedStyles.fontSize13,
		...sharedStyles.textNeutral5,
	},
});
