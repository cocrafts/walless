import type { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import { loyaltyTask } from '@walless/graphql/query';
import { Text } from '@walless/gui';
import { loyaltyState } from 'state/loyalty';
import { qlClient } from 'utils/graphql';
import type { LoyaltyParamList } from 'utils/navigation';

type Props = StackScreenProps<LoyaltyParamList, 'Details'>;

const LoyaltyDetailsScreen: FC<Props> = ({ route }) => {
	const taskId = route.params.id;

	const { data: task, isLoading } = useQuery({
		queryFn: async () => {
			if (loyaltyState.taskMap[taskId]) {
				return loyaltyState.taskMap[taskId];
			}

			const { loyaltyTask: task } = await qlClient.request(loyaltyTask, {
				id: taskId,
			});

			if (!task) {
				throw 'task not found';
			}

			loyaltyState.taskMap[taskId] = task;

			return task;
		},
		queryKey: [taskId],
	});

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (!task) {
		return (
			<View>
				<Text>Task not found</Text>
			</View>
		);
	}

	return (
		<View>
			<Text>{task.metadata['name'] || 'Unnamed Task'}</Text>
		</View>
	);
};

export default LoyaltyDetailsScreen;
