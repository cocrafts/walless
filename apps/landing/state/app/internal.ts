import { Networks } from '@walless/core';
import {
	type DetailState,
	type ProjectState,
	type Target,
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
				'Powerful for developers, fast for everyone. Very low, and consistent transaction fees.',
			logo: '/img/network/tezos-icon-sm.png',
			banner: '/img/preview/solana-banner.png',
		},
		detail: {
			networks: [Networks.tezos],
			tokens: {},
			collectibles: {},
			icon: '/img/network/solana-icon-lg.png',
		},
	},
});
