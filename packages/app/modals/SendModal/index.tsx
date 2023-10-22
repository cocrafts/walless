import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { SendFeature } from '@walless/app';
import { checkValidAddress, getTransactionFee } from '@walless/app/utils';
import type { Networks } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import { modalActions } from '@walless/gui';
import type { CollectibleDocument } from '@walless/store';

import { useNfts, usePublicKeys, useTokens } from '../../utils/hooks';

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
				createAndSendTransaction={() => {
					console.log('create and send');
				}}
			/>
		</View>
	);
};

export default SendModal;

const styles = StyleSheet.create({
	container: {
		width: 100,
		backgroundColor: '#141B21',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
});
