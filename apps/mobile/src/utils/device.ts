import device from 'react-native-device-info';
import type { DeviceInfoInput } from '@walless/graphql';

export const getDeviceInfo = async (): Promise<DeviceInfoInput> => {
	const [deviceId, deviceName, manufacturer, platform] = await Promise.all([
		await device.getUniqueId(),
		await device.getDeviceName(),
		await device.getManufacturer(),
		await device.getBaseOs(),
	]);

	return {
		deviceId,
		appVersion: device.getVersion(),
		brand: device.getBrand(),
		deviceName,
		systemVersion: device.getSystemVersion(),
		deviceType: device.getDeviceType(),
		manufacturer,
		platform,
	};
};
