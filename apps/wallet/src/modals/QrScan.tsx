import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
	ActivityIndicator,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { Camera, useCodeScanner } from 'react-native-vision-camera';
import type { Networks } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import { modalActions, Text, View } from '@walless/gui';
import { QrFrame, Times } from '@walless/icons';
import assets from 'utils/assets';
import { getNetworkInfo } from 'utils/helper';
import { useVisionCamera } from 'utils/hooks/camera';

import { showError } from './Error';
import { ModalId } from './types';

interface QRScannerProps {
	onScan: (code: string) => void;
	network: Networks;
}

type Props = QRScannerProps & {
	config: ModalConfigs;
};

const QRScanner: FC<Props> = ({ config, network, onScan }) => {
	const [layoutHeight, setLayoutHeight] = useState(400);
	const [layoutWidth, setLayoutWidth] = useState(400);

	const { device, hasPermission, error } = useVisionCamera('back');
	const [active, setActive] = useState(false);

	const networkInfo = useMemo(() => getNetworkInfo(network), [network]);

	const codeScanner = useCodeScanner({
		codeTypes: ['qr'],
		onCodeScanned: (codes) => {
			codes[0].value && onScan(codes[0].value);
		},
	});

	const handleClose = () => {
		modalActions.hide(config.id);
	};

	const handleLayout = (event: LayoutChangeEvent) => {
		setLayoutHeight(event.nativeEvent.layout.height);
		setLayoutWidth(event.nativeEvent.layout.width);
	};

	const qrFrameContainerStyle = useMemo(() => {
		const qrFrameWidth = layoutWidth - 160;

		return {
			height: qrFrameWidth,
			width: qrFrameWidth,
			left: 80,
			top: (layoutHeight - qrFrameWidth) / 2,
			right: 80,
		};
	}, [layoutHeight, layoutWidth]);

	useEffect(() => {
		if (error !== '') {
			showError({ errorText: error });
			modalActions.hide(config.id);
		}
	}, [error]);

	useEffect(() => {
		if (!hasPermission || !device) return;
		const timeout = setTimeout(() => setActive(true), 100);
		return () => clearTimeout(timeout);
	}, [device, hasPermission]);

	if (!device || !hasPermission) return <ActivityIndicator />;

	return (
		<View onLayout={handleLayout} style={styles.container}>
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

			<View style={[styles.qrFrameContainer, qrFrameContainerStyle]}>
				<QrFrame size={layoutWidth - 160} />
			</View>

			<View style={styles.networkContainer}>
				<Image
					style={styles.networkIcon}
					source={assets.widget[network].storeMeta.iconUri}
				/>
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
		component: ({ config }) => <QRScanner config={config} {...props} />,
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
	qrFrameContainer: {
		position: 'absolute',
		flexDirection: 'row',
		top: 200,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'space-between',
		maxHeight: 400,
	},
});
