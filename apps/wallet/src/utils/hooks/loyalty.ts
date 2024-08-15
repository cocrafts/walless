import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { LoyaltyProfile, Task } from '@walless/graphql';
import { TaskType } from '@walless/graphql';
import { loyaltyActiveTasks, loyaltyProfile } from '@walless/graphql/query';
import { loyaltyState } from 'state/loyalty';
import { QueryKey } from 'utils/constants';
import { qlClient } from 'utils/graphql';

export const useLoyaltyActiveTasks = () => {
	return useQuery({
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
};

export const useLoyaltyProfile = () => {
	return useQuery({
		queryKey: [QueryKey.LoyaltyProfile],
		queryFn: () =>
			qlClient.request(loyaltyProfile, {
				first: 20,
				after: '',
			}),
	});
};

export const useRemainingTime = (profile: LoyaltyProfile, task: Task) => {
	const [remainingTime, setRemainingTime] = useState(0);

	useEffect(() => {
		if (task.type !== TaskType.Recurring) {
			return;
		}

		profile.recurringStatusList?.forEach((status) => {
			if (status.taskId === task.id) {
				if (status.recentTrackAt) {
					const latestIntervalEndTime = getIntervalEndTime(
						new Date(status.recentTrackAt),
						status.interval,
					);
					const nextIntervalStartTime = getIntervalEndTime(
						latestIntervalEndTime,
						status.interval,
					);
					setRemainingTime(nextIntervalStartTime.getTime() - Date.now());
				}
			}
		});
	}, [profile, task]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (remainingTime > 0) {
				setRemainingTime((prev) => prev - 1000);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [remainingTime]);

	return remainingTime;
};

export const getIntervalEndTime = (taskTime: Date, interval: number) => {
	const intervalInMs = interval * 60 * 60 * 1000;

	const roundedTime =
		Math.ceil(taskTime.getTime() / intervalInMs) * intervalInMs;

	return new Date(roundedTime);
};
