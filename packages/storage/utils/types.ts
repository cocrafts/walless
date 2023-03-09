import { Dexie, Table } from 'dexie';

export interface SettingRecord {
	id?: number;
	step: string;
}

export interface KeyRecord {
	id?: string;
	iv: string;
	salt: string;
	ct: string;
	mac: string;
}

export interface UserProfile {
	id?: string;
	avatarUrl?: string;
}

export interface WallessDB {
	instance: Dexie;
	settings: Table<SettingRecord, number>;
	keys: Table<KeyRecord, string>;
}
