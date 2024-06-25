import type { RefObject } from 'react';
import type { View } from 'react-native';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

import { measureRelative, referenceMap } from './helper';
import type { ModalState, ShowModalConfigs } from './type';

export const modalState = proxy<ModalState>({
	count: 0,
	map: proxyMap(),
});

export const getSafeId = (id?: string): string => id || 'default-modal';

export const modalActions = {
	setContainerRef: (ref: RefObject<View>): void => {
		referenceMap.root = ref;
	},
	show: <T>({ id, bindingRef, ...restConfigs }: ShowModalConfigs<T>): void => {
		const safeId = getSafeId(id);

		measureRelative(bindingRef).then((layout) => {
			if (bindingRef) referenceMap[safeId] = bindingRef;

			modalState.map.set(safeId, {
				id: safeId,
				bindingRectangle: layout,
				...restConfigs,
			});
		});
	},
	hide: (id: string): void => {
		const instance = modalState.map.get(id);

		if (instance) {
			instance.onBeforeHide?.();
			modalState.map.set(id, { ...instance, hide: true });
		}
	},
	destroy: (id?: string): void => {
		const safeId = getSafeId(id);
		modalState.map.delete(safeId);
		delete referenceMap[safeId];
	},
};

export * from './helper';
export * from './type';
