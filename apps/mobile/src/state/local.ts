import { proxy } from 'valtio';

export interface LocalState {
	isDrawerOpen: boolean;
}

export const localState = proxy<LocalState>({
	isDrawerOpen: true,
});

export const localActions = {
	setIsDrawOpen: (flag: boolean) => {
		localState.isDrawerOpen = flag;
	},
};
