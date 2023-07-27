import { Networks } from '@walless/core';
import type {
	DetailState,
	ProjectState,
	Target,
} from 'features/home/EditTool/internal';
import { proxy } from 'valtio';

export interface AppState {
	tools: {
		target: Target;
		project: ProjectState;
		detail: DetailState;
	};
}

export const appState = proxy<AppState>({
	tools: {
		target: null,
		project: {
			name: 'Tezos',
			description:
				'Tezos is an open-source blockchain that can execute peer-to-peer transactions and serve as a platform for deploying smart contracts.',
			logo: '/img/network/tezos-icon-sm.png',
			banner: '/img/preview/tezos-banner.jpeg',
		},
		detail: {
			networks: [Networks.tezos],
			tokens: {},
			collectibles: {},
			icon: '/img/network/tezos-icon-lg.png',
		},
	},
});
