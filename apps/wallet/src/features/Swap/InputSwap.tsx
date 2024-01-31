import { type FC, useMemo } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Switch } from '@walless/icons';
import { useSnapshot } from 'utils/hooks';

import type { SwapContext } from './context';
import { swapActions, swapContext } from './context';
import SelectButton from './SelectButton';

const InputSwap: FC = () => {
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

	const handleSelectToToken = () => {
		swapActions.openSelectToken('to');
	};

	const updateAmount = (value: string) => {
		swapActions.update({ amount: value });
	};

	return (
		<View style={styles.swapContainer}>
			<View style={styles.fromContainer}>
				<View style={styles.fromTokenContainer}>
					<SelectButton token={fromToken} onPress={handleSelectFromToken} />
					<TextInput
						style={styles.amountInput}
						value={amount}
						onChangeText={updateAmount}
						placeholder="0"
						placeholderTextColor={'#566674'}
					/>
				</View>
				<View style={styles.bottomFromTokenContainer}>
					<View style={styles.balanceContainer}>
						<Text style={styles.balanceTitle}>Balance: </Text>
						<Text style={styles.balanceAmount}>{balance}</Text>
					</View>
					<Text style={styles.amountPrice}>{priceString}</Text>
				</View>
			</View>

			<View style={styles.switchContainer}>
				<View style={styles.separateLine} />
				<View style={styles.switchButton}>
					<Switch size={20} color="#3DC3FF" />
				</View>
				<View style={styles.separateLine} />
			</View>

			<View style={styles.toContainer}>
				<SelectButton onPress={handleSelectToToken} />
			</View>
		</View>
	);
};

export default InputSwap;

const styles = StyleSheet.create({
	swapContainer: {
		backgroundColor: '#1F2A34',
		borderWidth: 1,
		borderColor: '#566674',
		borderRadius: 15,
		paddingVertical: 20,
		paddingHorizontal: 16,
		gap: 14,
	},
	fromContainer: {
		gap: 14,
	},
	fromTokenContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	bottomFromTokenContainer: {
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
	switchContainer: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	separateLine: {
		flex: 1,
		height: 1,
		backgroundColor: '#566674',
	},
	switchButton: {
		borderWidth: 1,
		borderColor: '#566674',
		borderRadius: 100,
		padding: 8,
	},
	toContainer: {
		paddingBottom: 30,
	},
});
