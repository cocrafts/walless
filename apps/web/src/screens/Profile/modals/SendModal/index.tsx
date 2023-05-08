import { type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { SendTokenScreen } from '@walless/app';
import { modalActions, ModalConfigs } from '@walless/gui';
import { usePublicKeys, useTokens } from 'utils/hooks';
import {
	checkValidAddress,
	createAndSend,
	getTransactionFee,
} from 'utils/transaction';

export const SendModal: FC<{ config: ModalConfigs }> = ({ config }) => {
	const tokenList = useTokens();
	const addressList = usePublicKeys();

	return (
		<View style={styles.container}>
			<SendTokenScreen
				tokens={tokenList}
				publicKeys={addressList}
				getTransactionFee={getTransactionFee}
				onClose={() => modalActions.hide(config.id as string)}
				checkValidAddress={checkValidAddress}
				createAndSendTransaction={createAndSend}
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
