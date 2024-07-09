import type { UniversalLocalStorage } from './types';

export const universalLocalStorage: UniversalLocalStorage = {
	getItem: async (key) => {
		const jsonData = localStorage.getItem(key);
		if (!jsonData) {
			return null;
		}

		try {
			return JSON.parse(jsonData);
		} catch {
			return jsonData;
		}
	},
	setItem: async (key, value) => {
		if (typeof value === 'string') {
			localStorage.setItem(key, value);
		} else {
			localStorage.setItem(key, JSON.stringify(value));
		}
	},
	removeItem: async (key) => localStorage.removeItem(key),
	clear: async () => localStorage.clear(),
};
