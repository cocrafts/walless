import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import {
	checkValidAddress,
	getTransactionAbstractFee,
	getTransactionFee,
	SendFeature,
} from '@walless/app';
import type { Networks } from '@walless/core';
import { runtime } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	SwipeDownGesture,
} from '@walless/gui';
import { utils } from '@walless/ioc';
import type { CollectibleDocument } from '@walless/store';

import { useNfts, usePublicKeys, useTokens } from '../utils/hooks';

import { ModalId } from './internal';

export interface SendModalContext {
	layoutNetwork?: Networks;
	collectible?: CollectibleDocument;
}

const SendModal: FC<{ config: ModalConfigs }> = ({ config }) => {
	const { layoutNetwork, collectible } = config.context as SendModalContext;
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

export const showSendTokenModal = (context: SendModalContext) => {
	modalActions.show({
		id: ModalId.Send,
		bindingDirection: BindDirections.InnerBottom,
		animateDirection: AnimateDirections.Top,
		component: SendModal,
		context,
	});
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#131C24',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
});
