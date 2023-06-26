import { type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { SendFeature } from '@walless/app';
import { type Networks } from '@walless/core';
import { type ModalConfigs, modalActions } from '@walless/gui';
import { usePublicKeys, useTokens } from 'utils/hooks';
import {
	checkValidAddress,
	createAndSend,
	getTransactionFee,
	getTransactionResult,
} from 'utils/transaction';

interface ModalContext {
	layoutNetwork?: Networks;
}

export const SendModal: FC<{ config: ModalConfigs }> = ({ config }) => {
	const { layoutNetwork } = config.context as ModalContext;
	const { tokens } = useTokens(layoutNetwork);
	const addressList = usePublicKeys();

	return (
		<View style={styles.container}>
			<SendFeature
				tokens={tokens}
				publicKeys={addressList}
				getTransactionFee={getTransactionFee}
				onClose={() => modalActions.hide(config.id as string)}
				checkValidAddress={checkValidAddress}
				createAndSendTransaction={createAndSend}
				getTransactionResult={getTransactionResult}
			/>
		</View>
	);
};

export default SendModal;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#141B21',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
