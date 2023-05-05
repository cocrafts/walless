import { ProjectState } from 'features/home/EditTool/internal';
import { proxy } from 'valtio';

export interface AppState {
	counter: number;
	tools: {
		project: ProjectState;
	};
}

export const appState = proxy<AppState>({
	counter: 0,
	tools: {
		project: {
			name: '/img/preview/sui-banner.png',
			description: '/img/preview/sui-logo.png',
			logo: 'Sui is an innovative, decentralized Layer 1 blockchain that redefines asset ownership.',
			banner: 'Sui',
		},
	},
});
