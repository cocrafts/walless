import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import {
	Camera,
	useCameraDevice,
	useCameraPermission,
	useCodeScanner,
} from 'react-native-vision-camera';

export const QRScannerModalId = 'scan-qr';

export interface QRScannerProps {
	onScan: (data: string) => void;
}

export const QRScanner: FC<QRScannerProps> = ({ onScan }) => {
	const { hasPermission, requestPermission } = useCameraPermission();
	const [active, setActive] = useState(false);
	const device = useCameraDevice('back');

	if (!hasPermission) {
		requestPermission();
	}

	const codeScanner = useCodeScanner({
		codeTypes: ['qr'],
		onCodeScanned: (codes) => {
			codes[0].value && onScan(codes[0].value);
		},
	});

	useEffect(() => {
		if (!hasPermission || !device) return;
		const timeout = setTimeout(() => setActive(true), 1000);
		return () => clearTimeout(timeout);
	}, [device, hasPermission]);

	if (!device) {
		return <ActivityIndicator />;
	}

	return (
		<Camera
			style={styles.camera}
			photo={true}
			device={device}
			isActive={active}
			codeScanner={codeScanner}
		/>
	);
};

const styles = StyleSheet.create({
	camera: {
		width: '100%',
		height: 320,
	},
});
