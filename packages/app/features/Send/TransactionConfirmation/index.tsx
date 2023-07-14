import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Collectible, Networks, Token } from '@walless/core';
import type { TransactionPayload } from '@walless/core';
import type { SliderHandle } from '@walless/gui';
import { View } from '@walless/gui';
import { ResponseCode } from '@walless/messaging';
import type { CollectibleDocument } from '@walless/store';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../state/transaction';
import { NavButton } from '../components';
import { showError } from '../utils';

import { BigNFT } from './components/BigNFT';
import { RecipientInfo } from './components/RecipientInfo';
import { SenderInfo } from './components/SenderInfo';
import { BigToken, Header } from './components';

interface Props {
	navigator: SliderHandle;
}

const TransactionConfirmation: FC<Props> = ({ navigator }) => {
	const { createAndSendTransaction, handleSendNftSuccess } =
		useSnapshot(injectedElements);
	const { type, sender, receiver, amount, token, nftCollectible } =
		useSnapshot(transactionContext);

	const handleContinue = async () => {
		if (
			(type === 'Token' && !token) ||
			(type === 'Collectible' && !nftCollectible)
		)
			return showError('Invalid token to transfer');

		const payload: TransactionPayload = {
			sender: sender,
			receiver: receiver,
		} as TransactionPayload;

		switch (type) {
			case 'Token': {
				payload.amount = parseFloat(amount as string);
				payload.token = token as Token;
				payload.network = token?.network as Networks;
				break;
			}
			case 'Collectible': {
				payload.amount = 1;
				payload.token = nftCollectible as Collectible;
				payload.network = nftCollectible?.network as Networks;
				break;
			}
		}

		const res = await createAndSendTransaction(payload);

		if (res.responseCode == ResponseCode.REQUIRE_PASSCODE) {
			navigator.slideNext();
		} else if (res.responseCode == ResponseCode.SUCCESS) {
			if (nftCollectible && handleSendNftSuccess)
				handleSendNftSuccess(nftCollectible as CollectibleDocument);

			transactionActions.setSignatureString(
				res.signatureString || res.signedTransaction?.digest || res.hash,
			);
			navigator.slideTo(3);
		} else {
			showError('Something was wrong');
		}
	};

	return (
		<View style={styles.container}>
			<Header onBack={() => navigator.slideBack()} />

			{type === 'Token' ? <BigToken /> : <BigNFT />}

			<SenderInfo />

			<RecipientInfo />

			<NavButton title="Continue" onPress={handleContinue} />
		</View>
	);
};

export default TransactionConfirmation;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 14,
	},
});
