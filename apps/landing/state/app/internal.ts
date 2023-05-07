import { ProjectState, Target } from 'features/home/EditTool/internal';
import { proxy } from 'valtio';

export interface AppState {
	tools: {
		target: Target;
		project: ProjectState;
	};
}

export const appState = proxy<AppState>({
	tools: {
		target: null,
		project: {
			name: 'Sui',
			description:
				'Sui is an innovative, decentralized Layer 1 blockchain that redefines asset ownership.',
			logo: '/img/preview/sui-logo.png',
			banner: '/img/preview/sui-banner.png',
		},
	},
});
