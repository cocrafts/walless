import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Button, Select, Text, View } from '@walless/gui';
import type { TokenDocumentV2 } from '@walless/store';
import CheckedInput from 'components/CheckedInput';
import { NavButton } from 'components/NavButton';
import { useTokens } from 'utils/hooks';
import { checkValidAddress } from 'utils/transaction';

import type { TokenTransactionContext } from '../internal';
import { txActions, useTransactionContext } from '../internal';

import type { ErrorMessage } from './internal';
import QRScanButton from './QRScanButton';
import { TotalCost } from './TotalCost';
import TransactionFee from './TransactionFee';

interface Props {
	onContinue: () => void;
}

export const TokensTab: FC<Props> = ({ onContinue }) => {
	const { token, amount, network, tokenForFee, feeAmount, receiver } =
		useTransactionContext<TokenTransactionContext>();

	const { tokens } = useTokens(network);
	const [disabledMax, setDisabledMax] = useState(
		!token || !tokenForFee || !feeAmount,
	);
	const [recipientErrorMessage, setRecipientErrorMessage] =
		useState<ErrorMessage>('');
	const [amountErrorMessage, setAmountErrorMessage] =
		useState<ErrorMessage>('');

	const canContinue =
		recipientErrorMessage === null && amountErrorMessage === null && token;

	const getMetadata = (token: TokenDocumentV2) => {
		return {
			id: token._id,
			name: token.name,
			icon: { uri: token.image },
		};
	};

	const checkRecipient = (receiver?: string, network?: Networks) => {
		if (receiver && network) {
			const result = checkValidAddress(receiver, network);
			setRecipientErrorMessage(result);
		} else {
			setRecipientErrorMessage('');
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

	const handleSelectToken = (token: TokenDocumentV2) => {
		txActions.update<TokenTransactionContext>({
			token,
			network: token.network,
		});
		checkRecipient(receiver, token.network);
		checkAmount(amount, token.balance);
	};

	const handleMaxPress = () => {
		if (!feeAmount || !token || !tokenForFee) return;
		if (token.balance > 0) {
			setAmountErrorMessage(null);
		}
		txActions.update({ amount: token.balance.toString() });
	};

	const MaxButton = (
		<Button
			style={styles.maxButton}
			titleStyle={styles.titleMaxButton}
			title="Max"
			onPress={handleMaxPress}
			disabled={disabledMax}
		/>
	);

	useEffect(() => {
		setDisabledMax(!token || !tokenForFee || !feeAmount);
	}, [token, tokenForFee, feeAmount]);

	useEffect(() => {
		checkRecipient(receiver, network);
		checkAmount(amount, token.balance);
	}, []);

	return (
		<View style={styles.container}>
			<Select
				title="Select token"
				items={tokens as TokenDocumentV2[]}
				selected={token as TokenDocumentV2}
				onSelect={handleSelectToken}
				getRequiredFields={getMetadata}
			/>

			<CheckedInput
				value={receiver}
				placeholder="Recipient account"
				errorText={recipientErrorMessage}
				onChangeText={(receiver) => txActions.update({ receiver })}
				onBlur={() => checkRecipient(receiver, network)}
				suffix={QRScanButton({ network })}
			/>

			<CheckedInput
				value={amount}
				placeholder="Token amount"
				keyboardType="numeric"
				errorText={amountErrorMessage}
				onChangeText={(amount) => txActions.update({ amount })}
				onBlur={() => checkAmount(amount, token.balance)}
				suffix={MaxButton}
			/>

			<View style={styles.balanceContainer}>
				<Text style={styles.title}>Available balance</Text>
				<Text style={styles.balance}>{`${token.balance} ${token.symbol}`}</Text>
			</View>

			<TransactionFee />

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
