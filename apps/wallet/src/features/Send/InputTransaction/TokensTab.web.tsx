import { type FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { type Networks, type Token } from '@walless/core';
import { Button, Select, Text, View } from '@walless/gui';
import type { TokenDocument } from '@walless/store';
import CheckedInput from 'components/CheckedInput';
import { NavButton } from 'components/NavButton';
import { useTokens } from 'utils/hooks';
import {
	checkValidAddress,
	getBalanceFromToken,
	getTokenString,
} from 'utils/transaction';
import { useSnapshot } from 'valtio';

import { txActions, txContext } from '../context';

import type { ErrorMessage } from './internal';
import { TotalCost } from './TotalCost';
import TransactionFee from './TransactionFee';

interface Props {
	onContinue: () => void;
}

export const TokensTab: FC<Props> = ({ onContinue }) => {
	const { token, amount, network, tokenForFee, transactionFee, receiver } =
		useSnapshot(txContext).tx;
	const { tokens } = useTokens(network);
	const [disabledMax, setDisabledMax] = useState(
		!token || !tokenForFee || !transactionFee,
	);
	const [recipientErrorMessage, setRecipientErrorMessage] =
		useState<ErrorMessage>('');
	const [amountErrorMessage, setAmountErrorMessage] =
		useState<ErrorMessage>('');

	const canContinue =
		recipientErrorMessage === null && amountErrorMessage === null && token;

	const balance = token ? getBalanceFromToken(token as TokenDocument) : -1;

	const getRequiredFieldsForSelectToken = (item: Token) => {
		return {
			id: item.metadata?.name as string,
			name: item.metadata?.name as string,
			icon: { uri: item.metadata?.imageUri as string },
		};
	};

	const checkRecipient = (receiver?: string, network?: Networks) => {
		if (receiver && network) {
			const result = checkValidAddress(receiver, network);
			setRecipientErrorMessage(result);
		}
	};

	const checkAmount = (amount?: string, balance?: number) => {
		if (!amount) {
			setAmountErrorMessage('');
		} else if (isNaN(Number(amount))) {
			setAmountErrorMessage('Wrong number format, try again');
		} else if (Number(amount) <= 0) {
			setAmountErrorMessage('Try again with valid number');
		} else if (balance && Number(amount) > balance) {
			setAmountErrorMessage('Insufficient balance to send');
		} else {
			setAmountErrorMessage(null);
		}
	};

	const handleSelectToken = (token: TokenDocument) => {
		txActions.update({ token, network: token.network });
		checkRecipient(receiver, token.network);
		checkAmount(amount, getBalanceFromToken(token));
	};

	const handleMaxPress = () => {
		if (!transactionFee || !token || !tokenForFee) return;
		if (balance > 0) {
			setAmountErrorMessage(null);
		}
		txActions.update({ amount: balance.toString() });
	};

	const MaxButon = (
		<Button
			style={styles.maxButton}
			titleStyle={styles.titleMaxButton}
			title="Max"
			onPress={handleMaxPress}
			disabled={disabledMax}
		/>
	);

	useEffect(() => {
		setDisabledMax(!token || !tokenForFee || !transactionFee);
	}, [token, tokenForFee, transactionFee]);

	return (
		<View style={styles.container}>
			<Select
				title="Select token"
				items={tokens as TokenDocument[]}
				selected={token as TokenDocument}
				onSelect={handleSelectToken}
				getRequiredFields={getRequiredFieldsForSelectToken}
			/>

			<CheckedInput
				value={receiver}
				placeholder="Recipient account"
				errorText={recipientErrorMessage}
				onChangeText={(receiver) => txActions.update({ receiver })}
				onBlur={() => checkRecipient(receiver, network)}
			/>

			<CheckedInput
				value={amount}
				placeholder="Token amount"
				keyboardType="numeric"
				errorText={amountErrorMessage}
				onChangeText={(amount) => txActions.update({ amount })}
				onBlur={() => checkAmount(amount, balance)}
				suffix={MaxButon}
			/>

			<View style={styles.balanceContainer}>
				<Text style={styles.title}>Available balance</Text>
				<Text style={styles.balance}>
					{getTokenString(token as TokenDocument)}
				</Text>
			</View>

			<TransactionFee network={token?.network as Networks} />

			<View style={styles.totalLine} />

			<TotalCost />

			<NavButton
				title="Continue"
				disabled={!canContinue}
				onPress={onContinue}
			/>
		</View>
	);
};

export default TokensTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		rowGap: 16,
	},
	totalLine: {
		height: 1,
		backgroundColor: '#566674',
		opacity: 0.2,
	},
	maxButton: {
		paddingHorizontal: 8,
		paddingVertical: 5,
		backgroundColor: '#1E2830',
		borderRadius: 6,
		marginRight: 6,
	},
	qrButton: {
		padding: 8,
		marginRight: 8,
	},
	titleMaxButton: {
		fontSize: 10,
		lineHeight: 12,
		fontWeight: '500',
	},
	balanceContainer: {
		marginTop: -8,
		marginBottom: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		color: '#566674',
	},
	balance: {
		color: '#FFFFFF',
	},
});
