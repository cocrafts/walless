export interface ModalConfigs {
	id?: string;
}

export interface ModalState {
	count: number;
	hashmap: Record<string, ModalConfigs>;
}
