import { useEffect, useState } from 'react';
import type { BiometryType } from 'react-native-biometrics';
import { biometrics } from 'utils/native';

export interface BiometricStatus {
	isAvailable: boolean;
	type?: BiometryType;
}

export const useBiometricStatus = () => {
	const [sensor, setSensor] = useState<BiometricStatus>({ isAvailable: false });

	useEffect(() => {
		biometrics.isSensorAvailable().then(({ available, biometryType }) => {
			setSensor({ isAvailable: available, type: biometryType });
		});
	}, []);

	return {
		isAvailable: sensor.isAvailable,
		type: sensor.type,
	};
};
