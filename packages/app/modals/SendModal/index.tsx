import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { SendFeature } from '@walless/app';
import { checkValidAddress, getTransactionFee } from '@walless/app/utils';
import { useNfts, usePublicKeys, useTokens } from '@walless/app/utils/hooks';
import type { Networks } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import { modalActions } from '@walless/gui';
import { utils } from '@walless/ioc';
import type { CollectibleDocument } from '@walless/store';

interface ModalContext {
	layoutNetwork?: Networks;
	collectible?: CollectibleDocument;
}

export const SendModal: FC<{ config: ModalConfigs }> = ({ config }) => {
	const { layoutNetwork, collectible } = config.context as ModalContext;
	const { tokens } = useTokens(layoutNetwork);
	const { collectibles, collections } = useNfts(layoutNetwork);
	const addressList = usePublicKeys();

	const handleClose = () => {
		modalActions.hide(config.id as string);
	};

	return (
		<View style={styles.container}>
			<SendFeature
				initCollectible={collectible}
				tokens={tokens}
				nftCollections={collections}
				nftCollectibles={collectibles}
				publicKeys={addressList}
				getTransactionFee={getTransactionFee}
				onClose={handleClose}
				checkValidAddress={checkValidAddress}
				createAndSendTransaction={utils.createAndSend}
			/>
		</View>
	);
};

export default SendModal;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 60,
		marginBottom: 100,
		height: 600,
		backgroundColor: '#141B21',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
});
