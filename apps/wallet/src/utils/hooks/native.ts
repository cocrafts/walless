import { useEffect, useState } from 'react';
import { BIOMETRY_TYPE, getSupportedBiometryType } from 'react-native-keychain';

export interface BiometricStatus {
	isAvailable: boolean;
	isFingerPrint: boolean;
	type: BIOMETRY_TYPE | null;
}

const fingerPrintTypes: BIOMETRY_TYPE[] = [
	BIOMETRY_TYPE.TOUCH_ID,
	BIOMETRY_TYPE.FINGERPRINT,
];

export const useBiometricStatus = () => {
	const [type, setType] = useState<BIOMETRY_TYPE | null>(null);

	useEffect(() => {
		getSupportedBiometryType().then(setType);
	}, []);

	return {
		isAvailable: !!type,
		isFingerPrint: fingerPrintTypes.indexOf(type as never) >= 0,
		type,
	};
};
