import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from '@walless/gui';
import { useLoyaltyActiveTasks, useLoyaltyProfile } from 'utils/hooks';
import { sharedStyles } from 'utils/style';

import ProfileCard from './ProfileCard';
import TaskBoard from './TaskBoard';

const LoyaltyFeature = () => {
	const { data: activeTasksData, isLoading: isLoadingActiveTasks } =
		useLoyaltyActiveTasks();

	const { data: profileData, isLoading: isLoadingProfile } =
		useLoyaltyProfile();

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
