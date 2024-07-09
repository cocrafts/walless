import AsyncStorage from '@react-native-async-storage/async-storage';

import type { UniversalLocalStorage } from './types';

export const universalLocalStorage: UniversalLocalStorage = {
	getItem: async (key) => {
		const jsonData = await AsyncStorage.getItem(key);
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
			await AsyncStorage.setItem(key, value);
		} else {
			await AsyncStorage.setItem(key, JSON.stringify(value));
		}
	},
	removeItem: async (key) => await AsyncStorage.removeItem(key),
	clear: async () => await AsyncStorage.clear(),
};
