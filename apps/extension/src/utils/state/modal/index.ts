import { proxy } from 'valtio';

import { ModalState, ShowModalConfigs } from './type';

export const modalState = proxy<ModalState>({
	hashmap: {},
});

export const modalActions = {
	show: ({ id, ...restConfigs }: ShowModalConfigs) => {
		modalState.hashmap[id] = {
			id,
			close: false,
			...restConfigs,
		};
	},
	close: (id: string) => {
		const instance = modalState.hashmap[id];
		if (instance) {
			instance.close = true;
		}
	},
	destroy: (id: string) => {
		delete modalState.hashmap[id];
	},
};

export * from './type';
