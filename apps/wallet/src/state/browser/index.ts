import { proxy } from 'valtio';

interface BrowserState {
	url: string;
	isLoading: boolean;
	isInputMode: boolean;
}

export const browserState = proxy<BrowserState>({
	url: 'https://google.com',
	isLoading: false,
	isInputMode: false,
});

export const browserActions = {
	toggleLoading: (flag: boolean) => {
		browserState.isLoading = flag || !browserState.isLoading;
	},
	toggleInputMode: (flag: boolean) => {
		browserState.isInputMode = flag || !browserState.isInputMode;
	},
	setUrl: (url: string) => {
		browserState.url = url;
	},
};
