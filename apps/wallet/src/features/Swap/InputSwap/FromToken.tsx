import { useMemo } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { useSnapshot } from 'utils/hooks';

import type { SwapContext } from '../context';
import { swapActions, swapContext } from '../context';

import SelectButton from './SelectButton';

const FromToken = () => {
	const { fromToken, amount } = useSnapshot(swapContext).swap as SwapContext;

	const balance = useMemo(() => {
		if (!fromToken) return 0;
		return (
			parseFloat(fromToken.account.balance) / 10 ** fromToken.account.decimals
		);
	}, [fromToken]);

	const priceString = useMemo(() => {
		if (!fromToken?.account.quotes?.usd) return '-';
		if (!amount || isNaN(parseFloat(amount))) return '$0.00';
		const price = parseFloat(amount) * fromToken.account.quotes?.usd;
		return `$${price.toFixed(2)}`;
	}, [amount]);

	const handleSelectFromToken = () => {
		swapActions.openSelectToken('from');
	};

	const updateAmount = (amount: string) => {
		swapActions.update({ amount });
	};

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>From</Text>
				<Button
					style={styles.maxButton}
					titleStyle={styles.maxTitle}
					title="Max"
				/>
			</View>

			<View style={styles.tokenContainer}>
				<SelectButton
					symbol={fromToken?.metadata?.symbol}
					logoURI={fromToken?.metadata?.imageUri}
					onPress={handleSelectFromToken}
				/>
				<TextInput
					style={styles.amountInput}
					value={amount}
					onChangeText={updateAmount}
					placeholder="0"
					placeholderTextColor={'#566674'}
				/>
			</View>

			<View style={styles.valueContainer}>
				<View style={styles.balanceContainer}>
					<Text style={styles.balanceTitle}>Balance: </Text>
					<Text style={styles.balanceAmount}>{balance}</Text>
				</View>
				<Text style={styles.amountPrice}>{priceString}</Text>
			</View>
		</View>
	);
};

export default FromToken;

const styles = StyleSheet.create({
	container: {
		gap: 14,
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		color: '#FFFFFF',
	},
	maxButton: {
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: '#566674',
		backgroundColor: 'transparent',
		borderRadius: 10,
	},
	maxTitle: {
		fontSize: 12,
	},
	tokenContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	valueContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	balanceContainer: {
		flexDirection: 'row',
	},
	balanceTitle: {
		color: '#566674',
	},
	balanceAmount: {
		color: '#FFFFFF',
	},
	amountInput: {
		width: 140,
		fontSize: 30,
		textAlign: 'right',
		color: '#FFFFFF',
	},
	amountPrice: {
		color: '#566674',
		alignSelf: 'flex-end',
	},
});