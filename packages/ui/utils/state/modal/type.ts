import { FC } from 'react';

export interface ModalConfigs {
	id?: string;
	component: FC<{ config: ModalConfigs }>;
	context?: unknown;
}

export interface ModalState {
	count: number;
	hashmap: Record<string, ModalConfigs>;
}
