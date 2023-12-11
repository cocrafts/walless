import { useMemo } from 'react';
import { Platform } from 'react-native';
import type { EdgeInsets } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dimensionState } from '@walless/gui';
import { useSnapshot } from 'valtio';

export const useResponsive = () => {
	const { isMobile: isMobileDevice, windowSize } = useSnapshot(dimensionState);

	const isMobileResponsive = useMemo(() => {
		return windowSize.width < 600;
	}, [isMobileDevice, windowSize.width]);

	return {
		isMobileResponsive,
	};
};

export const useUniversalInsets = (): EdgeInsets => {
	const insets = useSafeAreaInsets();

	if (Platform.OS === 'web') {
		const computedStyle = getComputedStyle(document.documentElement);
		const top = computedStyle.getPropertyValue('--sat');
		const bottom = computedStyle.getPropertyValue('--sab');
		const left = computedStyle.getPropertyValue('--sal');
		const right = computedStyle.getPropertyValue('--sar');

		return {
			top: parseInt(top),
			bottom: parseInt(bottom),
			left: parseInt(left),
			right: parseInt(right),
		};
	}

	return insets;
};