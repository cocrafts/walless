import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import { Exclamation } from '@walless/icons';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../../../state/transaction';

interface Props {
	feeText?: string;
}

export const NormalTrasactionFee: FC<Props> = () => {
	const {
		type,
		token,
		nftCollection,
		transactionFee,
		sender,
		receiver,
		amount,
	} = useSnapshot(transactionContext);
	const { getTransactionFee, network } = useSnapshot(injectedElements);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			if (type === 'Token' && token?.network && amount && sender && receiver) {
				const fee = await getTransactionFee({
					sender,
					receiver,
					amount: parseFloat(amount),
					network: token.network,
					token: token,
					tokenForFee: token,
				});
				transactionActions.setTransactionFee(fee);
			} else if (type === 'Collectible' && nftCollection?.network) {
				const fee = await getTransactionFee({
					sender,
					receiver,
					amount: 1,
					network: nftCollection.network,
					token: token,
					tokenForFee: token,
				});
				transactionActions.setTransactionFee(fee);
			} else transactionActions.setTransactionFee(0);
			setLoading(false);
		})();
	}, [type, token, nftCollection, amount, sender, receiver]);

	let networkToken = '';
	if (network == Networks.tezos || token?.network == Networks.tezos) {
		networkToken = 'XTZ';
	} else if (network == Networks.sui || token?.network == Networks.sui) {
		networkToken = 'SUI';
	} else if (network == Networks.aptos || token?.network == Networks.aptos) {
		networkToken = 'APT';
	}

	const feeString = `${transactionFee ? transactionFee : 0} ${networkToken}`;

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Exclamation color="#566674" size={10} />
				<Text style={styles.titleText}>Transaction fee</Text>
			</View>

			<View style={styles.valueContainer}>
				{loading ? (
					<Text style={styles.feeText}>loading...</Text>
				) : (
					<Text style={styles.feeText}>{feeString}</Text>
				)}
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
		alignItems: 'center',
		marginTop: 2,
		marginBottom: 'auto',
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
