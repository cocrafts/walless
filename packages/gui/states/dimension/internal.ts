import { Dimensions, ScaledSize } from 'react-native';
import { throttle } from 'lodash';
import { proxy } from 'valtio';

import { detectMobile, getResponsiveLevel } from './helper';

export interface ResizePayload {
	screen: ScaledSize;
	window: ScaledSize;
}

export interface DimensionState {
	isMobile: boolean;
	responsiveLevel: number;
	screenSize: ScaledSize;
	windowSize: ScaledSize;
}

const windowSize = Dimensions.get('window');

export const dimensionState = proxy<DimensionState>({
	isMobile: detectMobile(),
	responsiveLevel: getResponsiveLevel(windowSize.width),
	screenSize: Dimensions.get('screen'),
	windowSize,
});

Dimensions.addEventListener('change', ({ window }) => {
	dimensionState.responsiveLevel = getResponsiveLevel(window.width);
});

Dimensions.addEventListener(
	'change',
	throttle(({ screen, window }: ResizePayload) => {
		dimensionState.screenSize = screen;
		dimensionState.windowSize = window;
	}, 200),
);
