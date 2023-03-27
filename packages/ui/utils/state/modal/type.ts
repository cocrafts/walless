import { FC, RefObject } from 'react';
import { View } from 'react-native';

export interface ModalConfigs {
	id?: string;
	component: FC<{ config: ModalConfigs }>;
	context?: unknown;
	hide?: boolean;
}

export type ShowModalConfigs = ModalConfigs & {
	bindingRef?: RefObject<View>;
};

export interface ModalState {
	count: number;
	hashmap: Record<string, ModalConfigs>;
}
