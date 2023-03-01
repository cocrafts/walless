export interface ModalConfigs {
	id: string;
	component: React.FC<{ config: ModalConfigs }>;
	context?: unknown;
	close?: boolean;
}

export type ShowModalConfigs = Omit<ModalConfigs, 'close'>;

export interface ModalState {
	hashmap: Record<string, ModalConfigs>;
}
