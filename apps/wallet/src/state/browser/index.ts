import { proxy } from 'valtio';

interface BrowserState {
	uri: string;
	isLoading: boolean;
}

export const browserState = proxy<BrowserState>({
	uri: 'https://google.com',
	isLoading: false,
});

export const browserActions = {
	toggleLoading: (flag: boolean) => {
		browserState.isLoading = flag || !browserState.isLoading;
	},
};
