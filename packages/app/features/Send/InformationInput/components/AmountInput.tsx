import { type FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { UnknownObject } from '@walless/core';
import { Button, Input, Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import {
	transactionActions,
	transactionContext,
} from '../../../../state/transaction';

export const AmountInput: FC = () => {
	const { token, amount } = useSnapshot(transactionContext);
	const [errorText, setErrorText] = useState<string>();
	const [renderBalance, setRenderBalance] = useState(false);

	let balance = -1;
	if (token) {
		balance = parseFloat(token.account.balance) / 10 ** token.account.decimals;
	}

	const handlerBlur = (e: UnknownObject) => {
		console.log(e.target.value.length);
		if (token && e.target.value.length > 0) {
			const amount = parseFloat(e.target.value);
			if (isNaN(amount)) {
				setErrorText('Invalid amount number');
			} else if (balance) {
				if (amount > balance) {
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
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: 336,
		justifyContent: 'space-between',
		marginBottom: 6,
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
