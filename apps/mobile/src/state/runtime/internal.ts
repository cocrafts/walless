import { proxy } from 'valtio';

export interface RuntimeState {
	isDrawerOpen: boolean;
}

export const runtimeState = proxy<RuntimeState>({
	isDrawerOpen: true,
});
