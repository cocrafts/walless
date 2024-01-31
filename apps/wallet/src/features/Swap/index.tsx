import { type FC, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import type { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import { Switch } from '@walless/icons';
import ModalHeader from 'components/ModalHeader';
import { useTokens } from 'utils/hooks';

import SelectToken from './SelectToken';

export type Props = {
	network?: Networks;
	onPressClose?: () => void;
};

const SwapFeature: FC<Props> = ({ network, onPressClose }) => {
	const { tokens } = useTokens(network);
	const [fromToken] = useState(tokens[0]);
	const [amount, setAmount] = useState('');

	const balance = useMemo(() => {
		return (
			parseFloat(fromToken.account.balance) / 10 ** fromToken.account.decimals
		);
	}, [fromToken]);

	const priceString = useMemo(() => {
		if (!fromToken.account.quotes) return '-';
		if (!amount || isNaN(parseFloat(amount))) return '$0.00';
		const price = parseFloat(amount) * fromToken.account.quotes?.usd;
		return `$${price.toFixed(2)}`;
	}, [amount]);

	const handleClose = () => {
		onPressClose?.();
	};

	return (
		<View style={styles.container}>
			<ModalHeader content="Swap" onPressClose={handleClose} />
			<View style={styles.swapContainer}>
				<View style={styles.fromContainer}>
					<View style={styles.fromTokenContainer}>
						<SelectToken token={fromToken} />
						<TextInput
							style={styles.amountInput}
							value={amount}
							onChangeText={setAmount}
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
					<SelectToken />
				</View>
			</View>
		</View>
	);
};

export default SwapFeature;

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		paddingBottom: 28,
		paddingHorizontal: 28,
		gap: 16,
	},
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
