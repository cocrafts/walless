import { useEffect, useState } from 'react';
import type { CameraPosition } from 'react-native-vision-camera';
import {
	useCameraDevice,
	useCameraPermission,
} from 'react-native-vision-camera';
import { showError } from 'modals/Error';

export enum CameraPermissionState {
	Allowed,
	NotAllowed,
	Pending,
}

export const useVisionCamera = (cameraType: CameraPosition) => {
	const [error, setError] = useState('');
	const { hasPermission, requestPermission } = useCameraPermission();

	const device = useCameraDevice(cameraType);

	useEffect(() => {
		if (!hasPermission) {
			requestPermission()
				.then((permission) => {
					if (!permission) {
						setError('Camera permission denied');
					}
				})
				.catch((error) => {
					showError({ errorText: error.message });
				});
		}

		if (!device) {
			setError('No camera found');
		}
	}, [hasPermission]);

	return { device, hasPermission, error };
};
