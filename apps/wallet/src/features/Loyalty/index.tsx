import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { loyaltyActiveTasks, loyaltyProfile } from '@walless/graphql/query';
import { Text } from '@walless/gui';
import { loyaltyState } from 'state/loyalty';
import { QueryKey } from 'utils/constants';
import { qlClient } from 'utils/graphql';
import { sharedStyles } from 'utils/style';

import ProfileCard from './ProfileCard';
import TaskBoard from './TaskBoard';

const LoyaltyFeature = () => {
	const { data: activeTasksData, isLoading: isLoadingActiveTasks } = useQuery({
		queryKey: [QueryKey.LoyaltyActiveTasks],
		queryFn: async () => {
			const tasks = await qlClient.request(loyaltyActiveTasks);
			tasks.loyaltyActiveTasks?.forEach((task) => {
				loyaltyState.taskMap[task.id] = task;
			});
			return tasks;
		},
		staleTime: 1000 * 60 * 30,
	});

	const { data: profileData, isLoading: isLoadingProfile } = useQuery({
		queryKey: [QueryKey.LoyaltyProfile],
		queryFn: () =>
			qlClient.request(loyaltyProfile, {
				first: 20,
				after: '',
			}),
		staleTime: 1000 * 60 * 10,
	});

	if (isLoadingProfile || isLoadingActiveTasks) {
		return (
			<View style={[styles.container, sharedStyles.flexCenter]}>
				<ActivityIndicator />
			</View>
		);
	}

	if (!profileData?.loyaltyProfile || !activeTasksData?.loyaltyActiveTasks) {
		return (
			<View style={[styles.container, sharedStyles.flexCenter]}>
				<Text>Failed to fetch data</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ProfileCard
				containerStyle={styles.profileContainer}
				profile={profileData.loyaltyProfile}
			/>
			<TaskBoard
				containerStyle={styles.taskContainer}
				profile={profileData.loyaltyProfile}
				tasks={activeTasksData.loyaltyActiveTasks}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#19232C',
		paddingTop: 8,
		gap: 16,
		flexGrow: 1,
	},
	profileContainer: {
		marginHorizontal: 16,
	},
	taskContainer: {
		flexGrow: 1,
	},
});

export default LoyaltyFeature;
