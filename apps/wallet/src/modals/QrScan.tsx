import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
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
import type { Networks } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import { modalActions, Text, View } from '@walless/gui';
import { Times } from '@walless/icons';
import assets from 'utils/assets';
import { getNetworkInfo } from 'utils/helper';

import { ModalId } from './types';

interface QRScannerProps {
	onScan: (code: string) => void;
	network: Networks;
}

interface Props {
	config: ModalConfigs;
	props: QRScannerProps;
}

const QRScanner: FC<Props> = ({ config, props }) => {
	const { network, onScan } = props;
	const { hasPermission, requestPermission } = useCameraPermission();
	const [active, setActive] = useState(false);
	const device = useCameraDevice('back');

	const networkInfo = useMemo(() => getNetworkInfo(network), [network]);

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
				<Image style={styles.networkIcon} source={assets.widget[network]} />
				<Text style={styles.networkText}>
					Scan {networkInfo?.name} address to send funds
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
	},
	camera: {
		flex: 1,
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
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#081016',
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
		left: 0,
		right: 0,
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
