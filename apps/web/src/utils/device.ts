import { runtime } from '@walless/core';
import type { DeviceInfoInput } from '@walless/graphql';
import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';

export const getDeviceInfo = async (): Promise<DeviceInfoInput> => {
	const deviceId = await getDeviceId();
	const settings = await modules.storage.safeGet<SettingDocument>('settings');

	return {
		deviceId,
		appVersion: settings?.config?.version || '1.0.0',
		brand: navigator.vendor,
		deviceName: navigator.appName,
		systemVersion: navigator.appVersion,
		deviceType: runtime.isExtension ? 'Extension' : 'Web',
		manufacturer: navigator.userAgent,
		platform: navigator.platform,
	};
};

const getDeviceId = async (): Promise<string> => {
	const settings = await modules.storage.safeGet<SettingDocument>('settings');
	if (settings?.deviceId) return settings?.deviceId;

	const uniqueId = crypto.randomUUID();
	await modules.storage.upsert<SettingDocument>('settings', async (doc) => {
		doc.deviceId = uniqueId;
		return doc;
	});

	return uniqueId;
};
