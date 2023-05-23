import { proxy } from 'valtio';

export interface SettingState {
	_id?: string;
	_rev?: string;
	isPrivate?: boolean;
}

export const settingState = proxy<SettingState>({});
