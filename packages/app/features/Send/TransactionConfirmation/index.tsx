import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks, Token, TransactionPayload } from '@walless/core';
import type { SliderHandle } from '@walless/gui';
import { View } from '@walless/gui';
import { ResponseCode } from '@walless/messaging';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionContext,
} from '../../../state/transaction';
import { NavButton } from '../components';
import { showError } from '../utils';

import { RecipientInfo } from './components/RecipientInfo';
import { SenderInfo } from './components/SenderInfo';
import { BigToken, Header } from './components';

interface Props {
	navigator: SliderHandle;
}

const TransactionConfirmation: FC<Props> = ({ navigator }) => {
	const { createAndSendTransaction } = useSnapshot(injectedElements);
	const { sender, receiver, amount, token } = useSnapshot(transactionContext);

	const handleContinue = async () => {
		if (!token) return showError('Invalid token to transfer');

		const payload: TransactionPayload = {
			sender: sender,
			receiver: receiver,
			amount: parseFloat(amount as string) * 10 ** token?.account.decimals,
			token: token as Token,
			network: token?.network as Networks,
		};
		const res = await createAndSendTransaction(payload);

		if (res.responseCode == ResponseCode.REQUIRE_PASSCODE) {
			navigator.slideNext();
		} else if (res.responseCode == ResponseCode.SUCCESS) {
			navigator.slideTo(3);
		} else {
			showError('Something was wrong');
		}
	};

	return (
		<View style={styles.container}>
			<Header onBack={() => navigator.slideBack()} />

			<BigToken />

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
		width: 336,
		gap: 14,
	},
});
