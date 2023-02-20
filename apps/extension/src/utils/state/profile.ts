import { proxy } from 'valtio';

export interface Account {
	public?: string;
}

export interface Profile {
	account: Account;
}

export const profileState = proxy<Profile>({
	account: {},
});

export const profileActions = {};
