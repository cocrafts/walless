import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useTokens } from '@walless/app';
import type { Networks, Token } from '@walless/core';
import { Select, Text, View } from '@walless/gui';
import type { TokenDocument } from '@walless/store';
import CheckedInput from 'components/CheckedInput';
import { NavButton } from 'components/NavButton';
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
	const { token, amount, network } = useSnapshot(txContext);
	const { tokens } = useTokens(network);

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

	return (
		<View style={styles.container}>
			<Select
				title="Select token"
				items={tokens as TokenDocument[]}
				selected={token as TokenDocument}
				onSelect={txActions.setToken}
				getRequiredFields={getRequiredFieldsForSelectToken}
			/>

			<RecipientInput />

			<CheckedInput
				value={amount}
				placeholder="Token amount"
				keyboardType="numeric"
				onChangeText={txActions.setAmount}
				checkFunction={checkAmount}
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
	balanceContainer: {
		marginTop: -20,
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
