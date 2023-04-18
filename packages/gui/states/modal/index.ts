import { RefObject } from 'react';
import { View } from 'react-native';
import { proxy } from 'valtio';

import { measureRelative, referenceMap } from './helper';
import { ModalState, ShowModalConfigs } from './type';

export const modalState = proxy<ModalState>({
	count: 0,
	hashmap: {},
});

export const modalActions = {
	setContainerRef: (ref: RefObject<View>): void => {
		referenceMap.root = ref;
	},
	show: ({ id, bindingRef, ...restConfigs }: ShowModalConfigs): void => {
		const safeId = id || 'default-modal';

		measureRelative(bindingRef).then((layout) => {
			modalState.hashmap[safeId] = {
				id: safeId,
				bindingRectangle: layout,
				...restConfigs,
			};
		});
	},
	hide: (id: string): void => {
		const instance = modalState.hashmap[id];
		if (instance) instance.hide = true;
	},
};

export * from './helper';
export * from './type';
