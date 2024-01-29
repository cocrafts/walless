import { type FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks, Token } from '@walless/core';
import { Button, Select, Text, View } from '@walless/gui';
import type { TokenDocument } from '@walless/store';
import BN from 'bn.js';
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
		if (!token || !amount) return;
		if (isNaN(Number(amount))) {
			return 'Invalid amount number';
		} else if (balance) {
			if (Number(amount) > balance) {
				return 'Your balance is not enough';
			}
		}
	};

	const handleMaxPress = () => {
		if (!transactionFee || !token || !tokenForFee) return;

		if (token._id === tokenForFee._id) {
			const decimalsMultiplier = 10 ** token.account.decimals;
			const balanceBN = new BN(balance * decimalsMultiplier);
			const feeBN = new BN(transactionFee * decimalsMultiplier);
			const amountBN = balanceBN.sub(feeBN);
			txActions.update({
				amount: (amountBN.toNumber() / decimalsMultiplier).toString(),
			});
		} else {
			txActions.update({ amount: balance.toString() });
		}
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

			<RecipientInput />

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
				<Text style={styles.title}>Balance</Text>
				<Text style={styles.balance}>
					{getTokenString(token as TokenDocument)}
				</Text>
			</View>

			<TransactionFee network={token?.network as Networks} />

			<View style={styles.totalLine} />

			<TotalCost />

			<NavButton title="Continue" onPress={onContinue} />
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
		marginTop: -20,
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
