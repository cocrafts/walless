import type { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { Networks } from '@walless/core';
import { modalActions } from '@walless/gui';
import { QrIcon } from '@walless/icons';
import { showError } from 'modals/Error';
import { showQRScannerModal } from 'modals/QrScan';
import { ModalId } from 'modals/types';
import { checkValidAddress } from 'utils/transaction';

import { txActions } from '../internal';

interface QRScanButtonProps {
	network: Networks;
}

export const QRScanButton: FC<QRScanButtonProps> = ({ network }) => {
	const handleScan = (value: string) => {
		const result = checkValidAddress(value, network as Networks);

		if (result !== null) {
			const errorTimeout = 2000;
			showError({ errorText: 'Invalid address' }, errorTimeout);
		} else {
			txActions.update({ receiver: value });
			modalActions.destroy(ModalId.QRScanner);
		}
	};

	return (
		<TouchableOpacity
			style={styles.qrButton}
			onPress={() =>
				showQRScannerModal({
					onScan: handleScan,
					network: network as Networks,
				})
			}
		>
			<QrIcon size={16} />
		</TouchableOpacity>
	);
};

export default QRScanButton;

const styles = StyleSheet.create({
	qrButton: {
		padding: 8,
		marginRight: 8,
	},
});
