import { type FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Slider } from '@walless/gui';
import type { CollectibleDocument } from '@walless/store';

import type {
	InjectedElements,
	TransactionType,
} from '../../state/transaction';
import {
	transactionActions,
	transactionContext,
} from '../../state/transaction';

import { sendScreens } from './shared';

type Props = Omit<InjectedElements, 'handleClose' | 'handleSendNftSuccess'> & {
	onClose: () => void;
	type?: TransactionType;
	initCollectible?: CollectibleDocument;
	onSendNftSuccess?: (collectible: CollectibleDocument) => void;
};

export const SendFeature: FC<Props> = ({
	type,
	initCollectible,
	tokens,
	nftCollections,
	nftCollectibles,
	publicKeys,
	onClose,
	getTransactionAbstractFee,
	getTransactionFee,
	checkValidAddress,
	createAndSendTransaction,
	getTransactionResult,
	onSendNftSuccess,
}) => {
	useEffect(() => {
		transactionActions.injectRequiredElements({
			tokens: tokens,
			tokenForFee: tokens[0],
			nftCollections: nftCollections,
			nftCollectibles: nftCollectibles,
			publicKeys: publicKeys,
			getTransactionFee,
			getTransactionAbstractFee,
			handleClose: () => {
				onClose();
				transactionActions.resetTransactionContext();
			},
			checkValidAddress,
			createAndSendTransaction,
			getTransactionResult,
			handleSendNftSuccess: onSendNftSuccess,
		});
	}, []);

	if (type) transactionActions.setType(type);
	if (initCollectible) {
		transactionActions.setType('Collectible');
		transactionActions.setNftCollectible(initCollectible);
	}

	return (
		<Slider
			style={styles.container}
			slideContainerStyle={styles.slideContainer}
			activeItem={sendScreens[0]}
			items={sendScreens}
			// animator={slideAnimators.bounce}
		></Slider>
	);
};

export default SendFeature;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 576,
	},
	slideContainer: {
		flex: 1,
		paddingHorizontal: 28,
		paddingBottom: 28,
		paddingTop: 16,
	},
});
