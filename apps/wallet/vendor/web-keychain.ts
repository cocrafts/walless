export enum BIOMETRY_TYPE {
	TOUCH_ID = 'TouchID',
	FACE_ID = 'FaceID',
	FINGERPRINT = 'Fingerprint',
	FACE = 'Face',
	IRIS = 'Iris',
}

export enum ACCESSIBLE {
	WHEN_UNLOCKED = 'AccessibleWhenUnlocked',
	AFTER_FIRST_UNLOCK = 'AccessibleAfterFirstUnlock',
	ALWAYS = 'AccessibleAlways',
	WHEN_PASSCODE_SET_THIS_DEVICE_ONLY = 'AccessibleWhenPasscodeSetThisDeviceOnly',
	WHEN_UNLOCKED_THIS_DEVICE_ONLY = 'AccessibleWhenUnlockedThisDeviceOnly',
	AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY = 'AccessibleAfterFirstUnlockThisDeviceOnly',
}

export enum ACCESS_CONTROL {
	USER_PRESENCE = 'UserPresence',
	BIOMETRY_ANY = 'BiometryAny',
	BIOMETRY_CURRENT_SET = 'BiometryCurrentSet',
	DEVICE_PASSCODE = 'DevicePasscode',
	APPLICATION_PASSWORD = 'ApplicationPassword',
	BIOMETRY_ANY_OR_DEVICE_PASSCODE = 'BiometryAnyOrDevicePasscode',
	BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE = 'BiometryCurrentSetOrDevicePasscode',
}

export const getSupportedBiometryType = async () => {
	return null;
};

export const getGenericPassword = async () => null;
export const setGenericPassword = async () => {};
