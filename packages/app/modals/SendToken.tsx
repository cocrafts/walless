import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { runtime } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import { modalActions, SwipeDownGesture } from '@walless/gui';
import { utils } from '@walless/ioc';
import type { CollectibleDocument } from '@walless/store';

import SendFeature from '../features/Send';
import {
	checkValidAddress,
	getTransactionAbstractFee,
	getTransactionFee,
} from '../utils';
import { useNfts, usePublicKeys, useTokens } from '../utils/hooks';

export interface ModalContext {
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
		<SwipeDownGesture
			style={styles.container}
			callbackOnClose={handleClose}
			gestureEnable={runtime.isMobile}
		>
			<SendFeature
				initCollectible={collectible}
				tokens={tokens}
				tokenForFee={tokens[0]}
				nftCollections={collections}
				nftCollectibles={collectibles}
				publicKeys={addressList}
				// TODO: resolve this with gasilon
				getTransactionFee={getTransactionFee}
				getTransactionAbstractFee={getTransactionAbstractFee}
				onClose={handleClose}
				checkValidAddress={checkValidAddress}
				createAndSendTransaction={utils.createAndSend}
				network={layoutNetwork}
			/>
		</SwipeDownGesture>
	);
};

export default SendModal;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#131C24',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
});
