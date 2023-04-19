import { Dimensions, ScaledSize } from 'react-native';
import { debounce } from 'lodash';
import { proxy } from 'valtio';

type ResizePayload = { window: ScaledSize; screen: ScaledSize };

export interface AppState {
	counter: number;
	screenDimensions: ScaledSize;
	windowDimensions: ScaledSize;
}

export const appState = proxy<AppState>({
	counter: 0,
	screenDimensions: Dimensions.get('screen'),
	windowDimensions: Dimensions.get('window'),
});

export const appActions = {
	increaseCounter: (): number => appState.counter++,
};

const onResize = ({ screen, window }: ResizePayload) => {
	appState.screenDimensions = screen;
	appState.windowDimensions = window;
};

Dimensions.addEventListener('change', debounce(onResize, 200));
