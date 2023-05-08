import { type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { SendTokenScreen } from '@walless/app';
import { modalActions, ModalConfigs } from '@walless/gui';
import { usePublicKeys, useTokens } from 'utils/hooks';
import { checkValidAddress, getTransactionFee } from 'utils/transaction';

export const SendModal: FC<{ config: ModalConfigs }> = ({ config }) => {
	console.log(config.context);

	const tokenList = useTokens();
	const addressList = usePublicKeys();

	return (
		<View style={styles.container}>
			<SendTokenScreen
				tokenList={tokenList}
				addressList={addressList}
				getTransactionFee={getTransactionFee}
				onClose={() => modalActions.hide(config.id as string)}
				onPressSendButton={() => console.log('Handle send token')}
				checkValidAddress={checkValidAddress}
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
