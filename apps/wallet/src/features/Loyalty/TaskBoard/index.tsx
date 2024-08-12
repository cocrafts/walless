import type { FC } from 'react';
import { useMemo, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoyaltyProfile, Task } from '@walless/graphql';
import { TaskType } from '@walless/graphql';
import {
	doLoyaltyTask,
	doLoyaltyTasksByRecurringGroup,
} from '@walless/graphql/mutation';
import { showError } from 'modals/Error';
import { QueryKey } from 'utils/constants';
import { gqlErrorToMeaningfulMessage } from 'utils/format';
import { qlClient, qlClientThatThrowError } from 'utils/graphql';
import { sharedStyles } from 'utils/style';

import TabSelect from './TabSelect';

interface Props {
	containerStyle?: ViewStyle;
	profile: LoyaltyProfile;
	tasks: Task[];
}

enum Tab {
	Walless = 'Walless',
	Partner = 'Partner',
}

const TaskBoard: FC<Props> = ({ containerStyle, profile, tasks }) => {
	const [activeTab, setActiveTab] = useState<Tab>(Tab.Walless);

	const queryClient = useQueryClient();

	const verifyMutation = useMutation({
		mutationFn: async (task: Task) => {
			if (!task.id) throw 'task id not found';

			if (task.type === TaskType.Recurring) {
				return qlClient.request(doLoyaltyTasksByRecurringGroup, {
					id: task.id,
				});
			} else {
				return qlClientThatThrowError.request(doLoyaltyTask, {
					id: task.id,
				});
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QueryKey.LoyaltyProfile],
			});
		},
		onError: (err) => {
			showError({ errorText: gqlErrorToMeaningfulMessage(err) }, 4000);
		},
	});

	const partnerTaskMap = useMemo(() => {
		const m: Record<string, Task[]> = {};
		tasks.forEach((task) => {
			const partner = task.metadata['partner'] ?? 'walless';
			m[partner] = [...(m[partner] || []), task];
		});
		return m;
	}, [tasks]);

	return (
		<View style={[styles.container, containerStyle]}>
			<TabSelect
				tabs={[Tab.Walless, Tab.Partner]}
				activeTab={activeTab}
				onTabPress={(tab) => setActiveTab(tab as Tab)}
			/>
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
