import { useMemo, useState } from 'react';
import type { LayoutRectangle } from 'react-native';
import { Platform } from 'react-native';
import type { EdgeInsets } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dimensionState } from '@walless/gui';
import { useDebouncedCallback } from 'use-debounce';
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

export interface GridLayoutOptions {
	referenceWidth: number;
	heightRatio?: number;
	gap: number;
}

export const useLazyGridLayout = ({
	referenceWidth = 160,
	heightRatio = 1,
	gap,
}: GridLayoutOptions) => {
	const [width, setWidth] = useState<number>(0);
	const onGridContainerLayout = useDebouncedCallback(
		(layout: LayoutRectangle) => {
			const extendedContainerWidth = layout.width + gap;
			const extendedItemWidth = referenceWidth + gap;
			const itemCount = Math.floor(extendedContainerWidth / extendedItemWidth);
			const extraWidth = extendedContainerWidth % extendedItemWidth;
			const nextWidth = referenceWidth + Math.floor(extraWidth / itemCount);

			if (nextWidth !== width) {
				setWidth(nextWidth);
			}
		},
		200,
	);

	return {
		onGridContainerLayout,
		width,
		height: width * heightRatio,
	};
};
