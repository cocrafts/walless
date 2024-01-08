import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { Transaction } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	Text,
	View,
} from '@walless/gui';
import { Times } from '@walless/icons';
import TransactionDetailsFeature from 'features/TransactionDetailsFeature';
import { useUniversalInsets } from 'utils/hooks';

import { ModalId } from './internal';

export interface TransactionDetailsProps {
	transaction: Transaction;
}

interface Props {
	config: ModalConfigs;
}

const TransactionDetailsModal: FC<Props> = ({ config }) => {
	const inset = useUniversalInsets();
	const containerStyle: ViewStyle = {
		paddingBottom: Math.max(inset.bottom, 16),
	};

	const handleHideModal = () => {
		modalActions.hide(ModalId.TransactionDetails);
	};

	const { transaction } = config.context as TransactionDetailsProps;

	return (
		<View style={[styles.container, containerStyle]}>
			<View style={styles.header}>
				<View />
				<Text style={styles.title}>Transaction Details</Text>
				<TouchableOpacity onPress={handleHideModal}>
					<Times size={16} />
				</TouchableOpacity>
			</View>
			<TransactionDetailsFeature {...transaction} />
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
		fullWidth: false,
		component: TransactionDetailsModal,
		bindingDirection: BindDirections.InnerBottom,
		animateDirection: AnimateDirections.Top,
		context,
	});
};
