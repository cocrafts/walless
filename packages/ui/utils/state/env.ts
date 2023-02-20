import { Dimensions, ScaledSize } from 'react-native';
import { debounce } from 'lodash';
import { proxy } from 'valtio';

type ResizePayload = { window: ScaledSize; screen: ScaledSize };

export interface EnvState {
	counter: number;
	screenDimensions: ScaledSize;
	windowDimensions: ScaledSize;
}

export const envState = proxy<EnvState>({
	counter: 0,
	screenDimensions: Dimensions.get('screen'),
	windowDimensions: Dimensions.get('window'),
});

export const envActions = {
	increaseCounter: (): number => envState.counter++,
};

const onResize = ({ screen, window }: ResizePayload) => {
	envState.screenDimensions = screen;
	envState.windowDimensions = window;
};

Dimensions.addEventListener('change', debounce(onResize, 200));
