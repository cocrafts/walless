import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import { Exclamation } from '@walless/icons';
import { useTransactionContext } from 'features/Send/internal';

interface Props {
	feeText?: string;
}

export const DefaultTransactionFee: FC<Props> = () => {
	const { feeAmount, feeLoading, network } = useTransactionContext();

	let networkToken = '';
	if (network == Networks.tezos) {
		networkToken = 'XTZ';
	} else if (network == Networks.sui) {
		networkToken = 'SUI';
	} else if (network == Networks.aptos) {
		networkToken = 'APT';
	}

	const feeString = `${feeAmount ? feeAmount : 0} ${networkToken}`;

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Exclamation color="#566674" size={10} />
				<Text style={styles.titleText}>Transaction fee</Text>
			</View>

			<View style={styles.valueContainer}>
				{feeLoading ? (
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
