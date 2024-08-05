import type { FC } from 'react';
import { useMemo, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { LoyaltyProfile, Task } from '@walless/graphql';
import { sharedStyles } from 'utils/style';

import TabSelect from './TabSelect';
import TasksByType from './TasksByType';

interface Props {
	containerStyle?: ViewStyle;
	profile: LoyaltyProfile;
	tasks: Task[];
}

const tabs = ['Walless', 'Partner'];

const TaskBoard: FC<Props> = ({ containerStyle, profile, tasks }) => {
	const [activeTab, setActiveTab] = useState<string>(tabs[0]);

	const partnerTaskMap = useMemo(() => {
		const m = new Map<string, Task[]>();
		tasks.forEach((task) => {
			const partner = task.metadata['partner'] ?? 'walless';
			m.set(partner, [...(m.get(partner) || []), task]);
		});
		return m;
	}, [tasks]);

	return (
		<View style={[styles.container, containerStyle]}>
			<TabSelect
				tabs={tabs}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>

			{activeTab === 'Walless' && (
				<TasksByType tasks={partnerTaskMap.get('walless') || []} />
			)}
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
