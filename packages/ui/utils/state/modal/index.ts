import { RefObject } from 'react';
import { View } from 'react-native';
import { proxy } from 'valtio';

import { referenceMap } from './helper';
import { ModalState } from './type';

export const modalState = proxy<ModalState>({
	count: 0,
	hashmap: {},
});

export const modalActions = {
	setContainerRef: (ref: RefObject<View>): void => {
		referenceMap.root = ref;
	},
	show: (): void => {
		console.log('show modal');
	},
	hide: (): void => {
		console.log('hide modal');
	},
};

export * from './helper';
export * from './type';
