import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Input, Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../../state/transaction';

export const RecipientInput: FC = () => {
	const { checkValidAddress } = useSnapshot(injectedElements);
	const { token, receiver } = useSnapshot(transactionContext);
	const [errorText, setErrorText] = useState<string>();

	const handlerBlur = () => {
		if (token) {
			if (receiver.length > 0) {
				const result = checkValidAddress(receiver, token?.network as Networks);
				if (!result.valid) setErrorText(result.message);
				else setErrorText('');
			} else setErrorText('');
		}
	};

	return (
		<View style={styles.container}>
			<Input
				value={receiver}
				importantStyle={!!errorText && styles.errorInputStyle}
				placeholder="Recipient account"
				onChangeText={transactionActions.setReceiver}
				onBlur={handlerBlur}
			/>
			<View style={styles.bottomBox}>
				{!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	title: {
		fontSize: 20,
	},
	closeButton: {
		backgroundColor: 'none',
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
	bottomBox: {
		height: 15,
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
