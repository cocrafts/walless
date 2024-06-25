import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type {
	RawTransactionHistory,
	SolanaTransferHistory,
} from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	Text,
	View,
} from '@walless/gui';
import { Times } from '@walless/icons';
import type { HistoryDocument } from '@walless/store';
import SolanaTransactionDetailsFeature from 'features/TransactionDetail';
import { useUniversalInsets } from 'utils/hooks';

import { ModalId } from './types';

export interface TransactionDetailsProps {
	transaction: HistoryDocument<RawTransactionHistory | SolanaTransferHistory>;
}

interface Props {
	config: ModalConfigs<TransactionDetailsProps>;
}

const TransactionDetailsModal: FC<Props> = ({ config }) => {
	const inset = useUniversalInsets();
	const containerStyle: ViewStyle = {
		paddingBottom: Math.max(inset.bottom, 16),
	};

	const handleHideModal = () => {
		modalActions.hide(ModalId.TransactionDetails);
	};

	if (!config.context) return null;
	const { transaction } = config.context;

	return (
		<View style={[styles.container, containerStyle]}>
			<View style={styles.header}>
				<View />
				<Text style={styles.title}>Transaction Details</Text>
				<TouchableOpacity onPress={handleHideModal}>
					<Times size={16} />
				</TouchableOpacity>
			</View>
			{'preBalance' in transaction && (
				<SolanaTransactionDetailsFeature {...transaction} />
			)}
		</View>
	);
};

export default TransactionDetailsModal;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#19232C',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		paddingHorizontal: 18,
		paddingVertical: 16,
		gap: 20,
		overflow: 'hidden',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
	},
});

export const showTransactionDetailsModal = (
	context: TransactionDetailsProps,
) => {
	modalActions.show({
		id: ModalId.TransactionDetails,
		fullWidth: true,
		component: TransactionDetailsModal,
		bindingDirection: BindDirections.InnerBottom,
		animateDirection: AnimateDirections.Top,
		context,
	});
};
