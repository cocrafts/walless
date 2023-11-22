import type { Device, DeviceInfoInput } from '@walless/graphql';
import { mutations } from '@walless/graphql';
import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';

const id = 'settings';

export const setPrivacy = async (hideBalance: boolean) => {
	await modules.storage.upsert<SettingDocument>(id, async (doc) => {
		doc.config.hideBalance = hideBalance;
		return doc;
	});
};

export const setPathname = async (latestScreen: string) => {
	await modules.storage.upsert<SettingDocument>(id, async (doc) => {
		doc.config.latestLocation = latestScreen;
		return doc;
	});
};

export const syncNotificationToken = async (
	nextToken: string,
	device: DeviceInfoInput,
) => {
	const settings = await modules.storage.safeGet<SettingDocument>(id);
	const isProfileReady = settings?.profile?.email;
	const lastNotificationToken = settings?.config?.notificationToken;

	if (!isProfileReady) return;
	if (nextToken !== lastNotificationToken) {
		device.notificationToken = nextToken;
		console.log('Registering notification token from device..');

		try {
			await modules.qlClient.request<
				{ registerDevice: Device },
				{ device: DeviceInfoInput }
			>(mutations.registerDevice, { device });

			await modules.storage.upsert<SettingDocument>(id, async (doc) => {
				doc.config.notificationToken = nextToken;
				return doc;
			});
		} catch (e) {
			console.log(e);
		}
	} else {
		console.log('Token already registered, skip syncing..');
	}
};
