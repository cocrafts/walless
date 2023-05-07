import { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import { Exclamation } from '@walless/icons';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionContext,
} from '../../../../state/transaction';

interface Props {
	feeText?: string;
}

export const NetworkFee: FC<Props> = () => {
	const [feeString, setFeeString] = useState<string>(' ');

	const { token } = useSnapshot(transactionContext);
	const { getTransactionFee } = useSnapshot(injectedElements);

	// const feeString = token?.network ? getTransactionFee() '';
	useEffect(() => {
		(async () => {
			if (token?.network) {
				const fee = await getTransactionFee(token.network as Networks);
				setFeeString(`${fee} ${token.network}`);
			}
		})();
	}, [token]);

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
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginVertical: 8,
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4,
	},
	titleText: {
		fontWeight: '500',
		fontSize: 14,
		color: '#566674',
	},
	valueContainer: {
		display: 'flex',
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
