import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { SendFeature } from '@walless/app';
import type { Networks } from '@walless/core';
import { collectiblesState } from '@walless/engine';
import type { ModalConfigs } from '@walless/gui';
import { modalActions } from '@walless/gui';
import type { CollectibleDocument } from '@walless/store';
import { useNfts, usePublicKeys, useTokens } from 'utils/hooks';
import {
	checkValidAddress,
	createAndSend,
	getTransactionFee,
	getTransactionResult,
} from 'utils/transaction';

interface ModalContext {
	layoutNetwork?: Networks;
	collectible?: CollectibleDocument;
}

export const SendModal: FC<{ config: ModalConfigs }> = ({ config }) => {
	const { layoutNetwork, collectible } = config.context as ModalContext;
	const { tokens } = useTokens(layoutNetwork);
	const { collectibles, collections } = useNfts(layoutNetwork);
	const addressList = usePublicKeys();

	return (
		<View style={styles.container}>
			<SendFeature
				initCollectible={collectible}
				tokens={tokens}
				nftCollections={collections}
				nftCollectibles={collectibles}
				publicKeys={addressList}
				getTransactionFee={getTransactionFee}
				onClose={() => modalActions.hide(config.id as string)}
				checkValidAddress={checkValidAddress}
				createAndSendTransaction={createAndSend}
				getTransactionResult={getTransactionResult}
				onSendNftSuccess={(collectible: CollectibleDocument) => {
					collectiblesState.map.delete(collectible._id);
				}}
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
		width: 400,
	},
});
