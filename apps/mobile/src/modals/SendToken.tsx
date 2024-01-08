import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { runtime } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	SwipeDownGesture,
} from '@walless/gui';
import type { CollectibleDocument } from '@walless/store';
import SendFeature from 'src/features/Send';

import { ModalId } from './internal';

export interface SendModalContext {
	layoutNetwork?: Networks;
	collectible?: CollectibleDocument;
}

const SendModal: FC<{ config: ModalConfigs }> = ({ config }) => {
	const handleClose = () => {
		modalActions.hide(config.id as string);
	};

	return (
		<SwipeDownGesture
			style={styles.container}
			callbackOnClose={handleClose}
			gestureEnable={runtime.isMobile}
		>
			<SendFeature />
			{/* <SendFeature
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
			/> */}
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
