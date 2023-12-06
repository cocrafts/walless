import Biometrics from 'react-native-biometrics';
import {
	ACCESS_CONTROL,
	ACCESSIBLE,
	getAllGenericPasswordServices,
	getGenericPassword,
	setGenericPassword,
} from 'react-native-keychain';
import { logger } from '@walless/core';

export const biometrics = new Biometrics({ allowDeviceCredentials: false });
import HapticFeedback from 'react-native-haptic-feedback';
import type { NativeModules } from '@walless/ioc';

export const hydrateEncryptionKey = async (value: string) => {
	await biometrics.simplePrompt({
		promptMessage: 'Register Biometrics',
		cancelButtonText: 'Do it later',
	});

	await setGenericPassword('encryptor', value, {
		accessControl: ACCESS_CONTROL.BIOMETRY_ANY,
		accessible: ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
	});
};

export const retrieveEncryptionKey = async (
	title?: string,
): Promise<string | null> => {
	try {
		const credentials = await getGenericPassword({
			authenticationPrompt: { title: title || 'Unlock Wallet' },
		});

		if (credentials) {
			return credentials.password;
		}
	} catch (error) {
		logger.error('Error accesing secure/keychain encryptor');
	}

	return null;
};

export const nativeModules: NativeModules = {
	triggerHaptic: HapticFeedback.trigger,
	hydrateEncryptionKey,
	retrieveEncryptionKey,
};
