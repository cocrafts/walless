import { type FC, useMemo } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Button, Hoverable, Text, View } from '@walless/gui';
import { Switch } from '@walless/icons';
import { showError } from 'modals/Error';
import { useSnapshot } from 'utils/hooks';

import type { SwapContext } from './context';
import { swapActions, swapContext } from './context';
import SelectButton from './SelectButton';

const InputSwap: FC = () => {
	const { fromToken, toToken, amount } = useSnapshot(swapContext)
		.swap as SwapContext;

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

	const handleSwitch = () => {
		if (!fromToken || !toToken) {
			showError({ errorText: 'Please select tokens to swap' });
		}
	};

	const updateAmount = (value: string) => {
		swapActions.update({ amount: value });
	};

	return (
		<View style={styles.swapContainer}>
			<View style={styles.fromTitleContainer}>
				<Text style={styles.title}>From</Text>
				<Button
					style={styles.maxButton}
					titleStyle={styles.maxTitle}
					title="Max"
				/>
			</View>
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
				<Hoverable style={styles.switchButton} onPress={handleSwitch}>
					<Switch size={20} color="#3DC3FF" />
				</Hoverable>
				<View style={styles.separateLine} />
			</View>

			<Text style={styles.title}>To</Text>
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
		gap: 10,
	},
	title: {
		color: '#FFFFFF',
	},
	fromTitleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
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
		alignItems: 'center',
		gap: 10,
		marginVertical: 6,
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
