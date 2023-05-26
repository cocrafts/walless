import { proxy } from 'valtio';

export interface SettingState {
	_id: string;
	hideBalance: boolean;
}

export const settingState = proxy<SettingState>({
	_id: '',
	hideBalance: true,
});
