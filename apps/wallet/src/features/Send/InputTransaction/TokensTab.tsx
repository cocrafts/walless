import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Button, Select, Text, View } from '@walless/gui';
import type { TokenDocument } from '@walless/store';
import CheckedInput from 'components/CheckedInput';
import { NavButton } from 'components/NavButton';
import { keyState } from 'state/keys';
import { useTokens } from 'utils/hooks';
import { checkValidAddress } from 'utils/transaction';

import type { TokenTransactionContext } from '../internal';
import { txActions, useTransactionContext } from '../internal';

import QRScanButton from './QRScanButton';
import { TotalCost } from './TotalCost';
import TransactionFee from './TransactionFee';

interface Props {
	onContinue: () => void;
}

export const TokensTab: FC<Props> = ({ onContinue }) => {
	const { type, token, amount, network, receiver } =
		useTransactionContext<TokenTransactionContext>();
	const { tokens } = useTokens(network);
	const [recipientError, setRecipientError] = useState('');
	const [amountError, setAmountError] = useState('');

	const isNotError = recipientError === '' && amountError === '';
	const isFulfilled = token && amount && receiver;
	const canContinue = isFulfilled && isNotError && token;

	const getMetadata = (token: TokenDocument) => {
		return {
			id: token._id,
			name: token.name,
			icon: { uri: token.image },
		};
	};

	const checkRecipient = (receiver?: string, network?: Networks) => {
		if (receiver && network) {
			const result = checkValidAddress(receiver, network);
			setRecipientError(result || '');
		} else {
			setRecipientError('');
		}
	};

	const checkAmount = (amount?: string, balance?: number) => {
		if (!amount) {
			setAmountError('');
		} else if (isNaN(Number(amount))) {
			setAmountError('Wrong number format, try again');
		} else if (Number(amount) <= 0) {
			setAmountError('Try again with valid number');
		} else if (balance && Number(amount) > balance) {
			setAmountError('Insufficient balance to send');
		} else {
			setAmountError('');
		}
	};

	const handleSelectToken = (token: TokenDocument) => {
		txActions.update<TokenTransactionContext>({
			token,
			network: token.network,
		});
		checkRecipient(receiver, token.network);
		checkAmount(amount, token.balance);
	};

	const handleMaxPress = () => {
		if (!token) return;
		txActions.update({ amount: token.balance.toString() });
		setAmountError('');
	};

	const MaxButton = (
		<Button
			style={styles.maxButton}
			titleStyle={styles.titleMaxButton}
			title="Max"
			onPress={handleMaxPress}
		/>
	);

	useEffect(() => {
		if (type === 'token' && token) {
			txActions.update({ network: token.network });
			const publicKeys = Array.from(keyState.map.values());
			const key = publicKeys.find((k) => k.network === network);
			if (key) txActions.update({ sender: key._id });
		}
	}, [type, token]);

	return (
		<View style={styles.container}>
			<Select
				title="Select token"
				items={tokens}
				selected={token}
				onSelect={handleSelectToken}
				getRequiredFields={getMetadata}
			/>

			<CheckedInput
				value={receiver}
				placeholder="Recipient account"
				errorText={recipientError}
				onChangeText={(receiver) => txActions.update({ receiver })}
				onBlur={() => checkRecipient(receiver, network)}
				suffix={network && QRScanButton({ network })}
			/>

			<CheckedInput
				value={amount}
				placeholder="Token amount"
				keyboardType="numeric"
				errorText={amountError}
				onChangeText={(amount) => txActions.update({ amount })}
				onBlur={token && (() => checkAmount(amount, token.balance))}
				suffix={MaxButton}
			/>

			{token && (
				<View style={styles.balanceContainer}>
					<Text style={styles.title}>Balance</Text>
					<Text
						style={styles.balance}
					>{`${token.balance} ${token.symbol}`}</Text>
				</View>
			)}

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
