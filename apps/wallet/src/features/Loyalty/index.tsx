import { StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { loyaltyActiveTasks, loyaltyProfile } from '@walless/graphql/query';
import { QueryKey } from 'utils/constants';
import { qlClient } from 'utils/graphql';

import ErrorText from './ErrorText';
import LoadingText from './LoadingText';
import ProfileCard from './ProfileCard';
import TaskBoard from './TaskBoard';

const LoyaltyFeature = () => {
	const {
		data: activeTasksData,
		isLoading: isLoadingActiveTasks,
		error: getActiveTasksError,
	} = useQuery({
		queryKey: [QueryKey.LoyaltyActiveTasks],
		queryFn: async () => qlClient.request(loyaltyActiveTasks),
		staleTime: 1000 * 60 * 30,
	});

	const {
		data: profileData,
		isLoading: isLoadingProfile,
		error: getProfileError,
	} = useQuery({
		queryKey: [QueryKey.LoyaltyProfile],
		queryFn: async () => qlClient.request(loyaltyProfile),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<View style={styles.container}>
			{isLoadingProfile && (
				<LoadingText
					style={styles.loadingTextContainer}
					text="Loading profile"
				/>
			)}

			{getProfileError && (
				<ErrorText
					style={styles.errorTextContainer}
					title="Failed to load profile"
					errorText={`${getProfileError.name}: ${getProfileError.message}`}
				/>
			)}

			{profileData?.loyaltyProfile && (
				<ProfileCard
					containerStyle={styles.profileContainer}
					profile={profileData.loyaltyProfile}
				/>
			)}

			{isLoadingActiveTasks && (
				<LoadingText style={styles.loadingTextContainer} text="Loading tasks" />
			)}

			{getActiveTasksError && (
				<ErrorText
					style={styles.errorTextContainer}
					title="Failed to load tasks"
					errorText={`${getActiveTasksError.name}: ${getActiveTasksError.message}`}
				/>
			)}

			{profileData?.loyaltyProfile && activeTasksData?.loyaltyActiveTasks && (
				<TaskBoard
					containerStyle={styles.taskContainer}
					profile={profileData.loyaltyProfile}
					tasks={activeTasksData.loyaltyActiveTasks}
				/>
			)}
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
	loadingTextContainer: {
		alignSelf: 'center',
	},
	errorTextContainer: {
		marginHorizontal: 16,
	},
});

export default LoyaltyFeature;
