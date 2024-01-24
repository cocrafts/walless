import type { FC } from 'react';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import type { Token } from '@walless/core';
import { logger, ResponseCode } from '@walless/core';
import type { SliderHandle } from '@walless/gui';
import { View } from '@walless/gui';
import { NavButton } from 'components/NavButton';
import { showError } from 'modals/Error';
import { createAndSend, prepareTransactionPayload } from 'utils/transaction';
import { useSnapshot } from 'valtio';

import { txActions, txContext } from '../context';

import { Header } from './Header';
import { NFTHeader } from './NFTHeader';
import { RecipientInfo } from './RecipientInfo';
import { SenderInfo } from './SenderInfo';
import { TokenHeader } from './TokenHeader';

interface Props {
	navigator: SliderHandle;
}

const TransactionConfirmation: FC<Props> = ({ navigator }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { type, sender, receiver, amount, token, collectible, tokenForFee } =
		useSnapshot(txContext).tx;

	const handleContinue = async () => {
		setIsLoading(true);
		const element = type === 'Token' ? token : collectible;
		if (!element) return showError({ errorText: 'Invalid token to transfer' });

		const payload = prepareTransactionPayload(
			element as never,
			sender,
			receiver,
			amount as string,
			tokenForFee as Token,
		);
		try {
			const res = await createAndSend(payload);
			if (res.responseCode == ResponseCode.REQUIRE_PASSCODE) {
				navigator.slideNext();
			} else if (res.responseCode == ResponseCode.SUCCESS) {
				const signature =
					res.signatureString || res.signedTransaction?.digest || res.hash;
				txActions.update({ signatureString: signature });
				navigator.slideTo(3);
			}
		} catch (error) {
			logger.error('Failure during NFT send:', error);
			showError({ errorText: 'Something was wrong' });
		}

		setIsLoading(false);
	};

	return (
		<View style={styles.container}>
			<Header onBack={navigator.slideBack} />

			{type === 'Token' ? <TokenHeader /> : <NFTHeader />}

			<SenderInfo />

			<RecipientInfo />

			{isLoading ? (
				<ActivityIndicator size={'large'} />
			) : (
				<NavButton title="Confirm" onPress={handleContinue} />
			)}
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
