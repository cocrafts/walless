import type { FC } from 'react';
import { useMemo } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Task } from '@walless/graphql';
import { TaskType } from '@walless/graphql';
import {
	doLoyaltyTask,
	doLoyaltyTasksByRecurringGroup,
} from '@walless/graphql/mutation';
import { Text } from '@walless/gui';
import { Refresh } from '@walless/icons';
import { showError } from 'modals/Error';
import { QueryKey } from 'utils/constants';
import { gqlErrorToMeaningfulMessage } from 'utils/format';
import { qlClient, qlClientThatThrowError } from 'utils/graphql';
import { useLoyaltyProfile, useRemainingTime } from 'utils/hooks';
import { sharedStyles } from 'utils/style';

import Countdown from './Countdown';
import Separator from './Separator';
import StreakIndicator from './StreakIndicator';
import TaskTags from './TaskTags';
import { countdownHeight, getIntervalEndTime, getTaskLogo } from './utils';

interface Props {
	task: Task;
}

const TaskCard: FC<Props> = ({ task }) => {
	const queryClient = useQueryClient();

	const { data: profileData } = useLoyaltyProfile();

	const remainingTime = useRemainingTime(profileData?.loyaltyProfile, task);

	const currentStreak = useMemo(() => {
		let cs = 0;

		if (!profileData?.loyaltyProfile || task.type !== TaskType.Streak) {
			return cs;
		}

		profileData.loyaltyProfile.recurringStatusList?.forEach((status) => {
			if (status.taskId === task.recurringId) {
				if (status.recentTrackAt) {
					const latestIntervalEndTime = getIntervalEndTime(
						new Date(status.recentTrackAt),
						status.interval,
					);
					const thisIntervalEndTime = getIntervalEndTime(
						latestIntervalEndTime,
						status.interval,
					);
					const nextIntervalEndTime = new Date(
						thisIntervalEndTime.getTime() + status.interval * 60 * 60 * 1000,
					);

					if (Date.now() < nextIntervalEndTime.getTime()) {
						const streak = task.streak || 1;
						cs = status.currentStreak % streak;
						if (cs === 0 && status.currentStreak > 0) {
							cs = streak;
						}
					}
				}
			}
		});

		return cs;
	}, [profileData?.loyaltyProfile, task]);

	const verifyMutation = useMutation({
		mutationFn: async () => {
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

	const showVerifyButton =
		task.type !== TaskType.Streak &&
		(task.type !== TaskType.Recurring || remainingTime <= 0);

	const showCompletedTag =
		task.type === TaskType.Recurring && remainingTime > 0;

	return (
		<View>
			<View
				style={[styles.container, remainingTime > 0 ? styles.passthrough : {}]}
			>
				<View style={styles.topContainer}>
					<View style={[sharedStyles.flexRow, sharedStyles.gap8]}>
						<View>{getTaskLogo(task)}</View>
						<View style={sharedStyles.gap4}>
							<Text style={sharedStyles.fontSize13}>
								{task.metadata['name'] || 'Unnamed Task'}
							</Text>

							{task.type === TaskType.Streak && (
								<StreakIndicator
									currentStreak={currentStreak}
									streak={task.streak || 0}
								/>
							)}
						</View>
					</View>

					<View style={[sharedStyles.flexRow, sharedStyles.gap8]}>
						{showVerifyButton && (
							<TouchableOpacity
								style={styles.verifyBtn}
								disabled={verifyMutation.isPending}
								onPress={() => verifyMutation.mutate()}
							>
								{verifyMutation.isPending ? (
									<ActivityIndicator size={14} />
								) : (
									<Refresh size={14} />
								)}
							</TouchableOpacity>
						)}
					</View>
				</View>

				<Separator />

				<TaskTags
					points={profileData?.loyaltyProfile.totalPoints || 0}
					showCompletedTag={showCompletedTag}
					showVerifyingTag={false}
				/>
			</View>

			{remainingTime > 0 && (
				<View style={styles.countdownContainer}>
					<Countdown remainingTime={remainingTime} />
				</View>
			)}
		</View>
	);
};

export default TaskCard;

const styles = StyleSheet.create({
	container: {
		padding: 16,
		gap: 16,
		borderRadius: 8,
		backgroundColor: '#202D38',
	},
	passthrough: {
		opacity: 0.5,
	},
	countdownContainer: {
		position: 'absolute',
		top: -countdownHeight / 2,
		left: 0,
		width: '100%',
		...sharedStyles.flexCenter,
	},
	topContainer: {
		...sharedStyles.flexRowBetween,
		minHeight: 30,
	},
	verifyBtn: {
		width: 28,
		height: 28,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#43525E',
		backgroundColor: '#32404B',
		...sharedStyles.flexCenter,
	},
});
