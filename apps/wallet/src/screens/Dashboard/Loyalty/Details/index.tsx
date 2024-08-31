import type { FC } from 'react';
import { ActivityIndicator, Image, ImageBackground, View } from 'react-native';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { StackScreenProps } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import {
	loyaltyPartners,
	loyaltyProfile,
	loyaltyTask,
} from '@walless/graphql/query';
import { Text } from '@walless/gui';
import { loyaltyState } from 'state/loyalty';
import assets from 'utils/assets';
import { QueryKey } from 'utils/constants';
import { qlClient } from 'utils/graphql';
import type { LoyaltyParamList } from 'utils/navigation';
import { sharedStyles } from 'utils/style';

import Header from './Header';
import TaskInfo from './TaskInfo';

type Props = StackScreenProps<LoyaltyParamList, 'Tasks'>;

const LoyaltyDetailsScreen: FC<Props> = ({ route, navigation }) => {
	const taskId = route.params.id;

	const { data: task, isLoading: isLoadingTask } = useQuery({
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

	const { data: profileData, isLoading: isLoadingProfile } = useQuery({
		queryFn: () => qlClient.request(loyaltyProfile, { first: 20, after: '' }),
		queryKey: [QueryKey.LoyaltyProfile],
	});

	const { data: partners, isLoading: isLoadingPartners } = useQuery({
		queryFn: async () => qlClient.request(loyaltyPartners),
		queryKey: [QueryKey.LoyaltyPartners],
	});

	if (isLoadingTask || isLoadingProfile || isLoadingPartners) {
		return (
			<ActivityIndicator
				style={[sharedStyles.fullHeight, sharedStyles.flexCenter]}
			/>
		);
	}

	if (!task || !profileData?.loyaltyProfile) {
		return (
			<View style={[sharedStyles.fullHeight, sharedStyles.flexCenter]}>
				<Text>Missing data</Text>
			</View>
		);
	}

	const partner = partners?.loyaltyPartners.find(
		(p) => p.id === task.metadata['partnerId'],
	);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={
					partner ? { uri: partner.coverImage } : assets.misc.wallessCover
				}
				style={styles.backgroundImageContainer}
				resizeMode="cover"
			>
				<LinearGradient
					colors={['rgba(25, 35, 44, 1)', 'rgba(25, 35, 44, 0)']}
					style={{ height: '100%' }}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
				>
					<Header
						style={styles.headerContainer}
						title="Back"
						onGoBack={() => {
							navigation.canGoBack() && navigation.goBack();
						}}
					/>
				</LinearGradient>
			</ImageBackground>

			<View>
				<View style={styles.partnerInfoContainer}>
					<Image
						style={styles.logo}
						source={partner ? { uri: partner.logo } : assets.misc.walless}
					/>
					<Text style={styles.partnerText}>{partner?.name || 'Walless'}</Text>
				</View>
			</View>

			<TaskInfo
				style={styles.detailsContainer}
				task={task}
				profile={profileData.loyaltyProfile}
			/>
		</View>
	);
};

export default LoyaltyDetailsScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#19232C',
	},
	headerContainer: {
		marginLeft: 20,
		marginTop: 24,
	},
	backgroundImageContainer: {
		height: 200,
	},
	partnerInfoContainer: {
		position: 'absolute',
		top: -24,
		left: 16,
		borderRadius: 100,
		paddingHorizontal: 12,
		paddingVertical: 10,
		...sharedStyles.flexRow,
		gap: 8,
		backgroundColor: '#212B35',
		...sharedStyles.shadow2,
	},
	partnerText: {
		fontWeight: '500',
		color: 'white',
	},
	logo: {
		width: 32,
		height: 32,
		borderRadius: 16,
		overflow: 'hidden',
	},
	detailsContainer: {
		marginTop: 40,
		paddingHorizontal: 16,
	},
});
