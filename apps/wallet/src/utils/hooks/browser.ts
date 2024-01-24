import { useState } from 'react';
import type { NativeSyntheticEvent } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { logger } from '@walless/core';

interface ProgressEvent {
	progress: number;
}

interface LoadEvent {
	title: string;
	url: string;
	target: number;
	loading: boolean;
	canGoBack: boolean;
	canGoForward: boolean;
	navigationType:
		| 'click'
		| 'formsubmit'
		| 'backforward'
		| 'reload'
		| 'formresubmit'
		| 'other';
}

export const useWebViewProgress = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const progress = useSharedValue<number>(0);

	return {
		loading,
		onLoadStart: ({ nativeEvent }: NativeSyntheticEvent<LoadEvent>) => {
			logger.debug(nativeEvent, '<-- start');
			setLoading(nativeEvent.loading);
		},
		onLoadProgress: ({ nativeEvent }: NativeSyntheticEvent<ProgressEvent>) => {
			progress.value = nativeEvent.progress;
		},
		onloadEnd: ({ nativeEvent }: NativeSyntheticEvent<LoadEvent>) => {
			logger.debug(nativeEvent, '<-- end');
			setLoading(nativeEvent.loading);
		},
	};
};
