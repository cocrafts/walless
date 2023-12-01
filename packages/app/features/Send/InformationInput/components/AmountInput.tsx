import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import { transactionActions, transactionContext } from '../../../../state';

export const AmountInput: FC = () => {
	const { token, amount } = useSnapshot(transactionContext);
	const [errorText, setErrorText] = useState<string>();
	const [renderBalance, setRenderBalance] = useState(false);

	let balance = -1;
	if (token) {
		balance = parseFloat(token.account.balance) / 10 ** token.account.decimals;
	}

	const handlerBlur = () => {
		if (token && amount) {
			if (isNaN(Number(amount))) {
				setErrorText('Invalid amount number');
			} else if (balance) {
				if (Number(amount) > balance) {
					setErrorText('Your balance is not enough');
				} else {
					setErrorText('');
				}
			}
		} else {
			setErrorText('');
		}
	};

	const handlePressMaxButton = () => {
		if (token) setRenderBalance((renderBalance) => !renderBalance);
	};

	return (
		<View style={styles.container}>
			{token && renderBalance && (
				<Text style={styles.balanceText}>
					{balance + ' ' + token?.metadata?.symbol}
				</Text>
			)}
			<Input
				value={amount != undefined ? String(amount) : ''}
				importantStyle={!!errorText && styles.errorInputStyle}
				placeholder="Token amount"
				onChangeText={transactionActions.setAmount}
				onBlur={handlerBlur}
				suffix={
					<Button
						style={styles.maxButton}
						titleStyle={styles.titleMaxButton}
						onPress={handlePressMaxButton}
						title="Max"
					/>
				}
			/>
			<View style={styles.bottomBox}>
				{!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		marginTop: -16,
	},
	title: {
		fontSize: 20,
	},
	closeButton: {
		backgroundColor: 'none',
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
	balanceText: {
		position: 'absolute',
		top: -16,
		fontSize: 12,
		right: 10,
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
	bottomBox: {
		height: 14,
		marginTop: 1,
		marginRight: 'auto',
		paddingLeft: 6,
	},
	errorText: {
		fontSize: 13,
		color: '#AE3939',
	},
	errorInputStyle: {
		borderColor: '#AE3939',
		color: '#AE3939',
	},
});
