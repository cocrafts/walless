import { logger } from '@walless/core';
import type { Device, DeviceInfoInput } from '@walless/graphql';
import { mutations } from '@walless/graphql';
import type { SettingDocument } from '@walless/store';
import { qlClient } from 'utils/graphql';
import { storage } from 'utils/storage';

const id = 'settings';

export const setPrivacy = async (hideBalance: boolean) => {
	await storage.upsert<SettingDocument>(id, async (doc) => {
		doc.config.hideBalance = hideBalance;
		return doc;
	});
};

export const syncDeviceInfo = async (device: DeviceInfoInput) => {
	try {
		await storage.upsert<SettingDocument>(id, async (doc) => {
			doc.config = Object.assign({}, doc.config);
			doc.config.notificationToken = device.notificationToken as string;
			return doc;
		});

		await qlClient.request<
			{ registerDevice: Device },
			{ device: DeviceInfoInput }
		>(mutations.registerDevice, { device });
	} catch (e) {
		logger.error('Error when setDeviceInfo', e);
	}
};
