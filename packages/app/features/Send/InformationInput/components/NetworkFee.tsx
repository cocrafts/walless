import type { FC } from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import { Exclamation } from '@walless/icons';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../../state/transaction';

interface Props {
	feeText?: string;
}

export const NetworkFee: FC<Props> = () => {
	const { token, transactionFee } = useSnapshot(transactionContext);
	const { getTransactionFee } = useSnapshot(injectedElements);

	useEffect(() => {
		(async () => {
			if (token?.network) {
				const fee = await getTransactionFee(token.network as Networks);
				transactionActions.setTransactionFee(fee);
			}
		})();
	}, [token]);

	let networkToken = '';
	if (token?.network == Networks.solana) {
		networkToken = 'SOL';
	} else if (token?.network == Networks.sui) {
		networkToken = 'SUI';
	}
	const feeString = `${transactionFee ? transactionFee : 0} ${networkToken}`;

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Exclamation color="#566674" size={10} />
				<Text style={styles.titleText}>Network fee</Text>
			</View>

			<View style={styles.valueContainer}>
				<Text style={styles.feeText}>{feeString}</Text>
				<Text style={styles.equalText}>~ 0 secs</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start',
		gap: 4,
	},
	titleText: {
		fontWeight: '500',
		fontSize: 14,
		color: '#566674',
	},
	valueContainer: {
		justifyContent: 'center',
		alignItems: 'flex-end',
		gap: 4,
	},
	feeText: {
		fontWeight: '500',
		fontSize: 14,
		color: '#FFFFFF',
	},
	equalText: {
		fontWeight: '400',
		fontSize: 12,
		color: '#566674',
	},
});
