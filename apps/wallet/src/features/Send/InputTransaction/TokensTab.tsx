import { type FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks, Token } from '@walless/core';
import { Button, Select, Text, View } from '@walless/gui';
import type { TokenDocument } from '@walless/store';
import CheckedInput from 'components/CheckedInput';
import { NavButton } from 'components/NavButton';
import { useTokens } from 'utils/hooks';
import { getTokenString } from 'utils/transaction';
import { useSnapshot } from 'valtio';

import { txActions, txContext } from '../context';

import RecipientInput from './RecipientInput';
import { TotalCost } from './TotalCost';
import TransactionFee from './TransactionFee';

interface Props {
	onContinue: () => void;
}

export const TokensTab: FC<Props> = ({ onContinue }) => {
	const { token, amount, network, tokenForFee, transactionFee } =
		useSnapshot(txContext).tx;
	const { tokens } = useTokens(network);
	const [disabledMax, setDisabledMax] = useState(
		!token || !tokenForFee || !transactionFee,
	);
	const [validRecipient, setValidRecipient] = useState(false);
	const [validAmount, setValidAmount] = useState(false);
	const canContinue = validRecipient && validAmount && token;

	const balance = token
		? parseFloat(token.account.balance) / 10 ** token.account.decimals
		: -1;

	const getRequiredFieldsForSelectToken = (item: Token) => {
		return {
			id: item.metadata?.name as string,
			name: item.metadata?.name as string,
			icon: { uri: item.metadata?.imageUri as string },
		};
	};

	const checkAmount = (amount?: string) => {
		let errorText: string | undefined;

		if (!token || !amount) {
			errorText = '';
		} else if (isNaN(Number(amount))) {
			errorText = 'Wrong number format, try again';
		} else if (Number(amount) <= 0) {
			errorText = 'Try again with valid number';
		} else if (balance && Number(amount) > balance) {
			errorText = 'Insufficient balance to send';
		}

		setValidAmount(errorText === undefined ? true : false);

		return errorText;
	};

	const handleMaxPress = () => {
		if (!transactionFee || !token || !tokenForFee) return;
		if (balance > 0) {
			setValidAmount(true);
		}
		txActions.update({ amount: balance.toString() });
	};

	useEffect(() => {
		setDisabledMax(!token || !tokenForFee || !transactionFee);
	}, [token, tokenForFee, transactionFee]);

	return (
		<View style={styles.container}>
			<Select
				title="Select token"
				items={tokens as TokenDocument[]}
				selected={token as TokenDocument}
				onSelect={(token) => txActions.update({ token })}
				getRequiredFields={getRequiredFieldsForSelectToken}
			/>

			<RecipientInput setValidRecipient={setValidRecipient} />

			<CheckedInput
				value={amount}
				placeholder="Token amount"
				keyboardType="numeric"
				onChangeText={(amount) => txActions.update({ amount })}
				checkFunction={checkAmount}
				suffix={
					<Button
						style={styles.maxButton}
						titleStyle={styles.titleMaxButton}
						title="Max"
						onPress={handleMaxPress}
						disabled={disabledMax}
					/>
				}
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
