import { type FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Slider } from '@walless/gui';
import type { CollectibleDocument } from '@walless/store';

import type {
	InjectedElements,
	TransactionType,
} from '../../state/transaction';
import { transactionActions } from '../../state/transaction';

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
	onSendNftSuccess,
}) => {
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
		handleSendNftSuccess: onSendNftSuccess,
	});

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
		height: 590,
	},
	slideContainer: {
		height: 590,
		paddingTop: 16,
		paddingBottom: 28,
		paddingHorizontal: 28,
	},
});
