import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import {
	Camera,
	useCameraDevice,
	useCameraPermission,
	useCodeScanner,
} from 'react-native-vision-camera';
import type { ModalConfigs } from '@walless/gui';
import { modalActions, Text, View } from '@walless/gui';
import { Times } from '@walless/icons';
import assets from 'utils/assets';

import { ModalId } from './types';

interface QRScannerProps {
	onScan: (code: string) => void;
	networkName: string;
}

interface Props {
	config: ModalConfigs;
	props: QRScannerProps;
}

const QRScanner: FC<Props> = ({ config, props }) => {
	const { networkName, onScan } = props;
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

	const handleClose = () => {
		modalActions.hide(config.id);
	};

	useEffect(() => {
		if (!hasPermission || !device) return;
		const timeout = setTimeout(() => setActive(true), 100);
		return () => clearTimeout(timeout);
	}, [device, hasPermission]);

	if (!device) {
		return <ActivityIndicator />;
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Scan QR</Text>
				<Text style={styles.title}>Scan QR</Text>

				<TouchableOpacity style={styles.closeButton} onPress={handleClose}>
					<Times />
				</TouchableOpacity>
			</View>
			<Camera
				style={styles.camera}
				photo={true}
				device={device}
				isActive={active}
				codeScanner={codeScanner}
			/>
			<View style={styles.networkContainer}>
				<Image
					style={styles.networkIcon}
					source={assets.widget.solana.storeMeta.iconUri}
				/>
				<Text style={styles.networkText}>
					Scan {networkName} address to send funds
				</Text>
			</View>
		</View>
	);
};

export default QRScanner;

export const showQRScannerModal = (props: QRScannerProps) => {
	modalActions.show({
		id: ModalId.QRScanner,
		component: ({ config }) => <QRScanner config={config} props={props} />,
		fullHeight: true,
		fullWidth: true,
	});
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// minHeight: 320,
		backgroundColor: 'red',
	},
	camera: {
		position: 'relative',
		width: 600,
		height: 600,
	},
	closeButton: {
		position: 'absolute',
		top: 16,
		left: 16,
	},
	header: {
		flex: 1,
		minHeight: 100,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#081016',
		paddingVertical: 16,
		zIndex: 1,
	},
	title: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
	networkContainer: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 4,
		left: 'auto',
		right: 'auto',
		bottom: 40,
	},
	networkText: {
		color: '#FFFFFF',
		fontWeight: '500',
	},
	networkIcon: {
		width: 36,
		height: 36,
		borderRadius: 18,
	},
});
