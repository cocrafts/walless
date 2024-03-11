import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import { getNetworkMetadata } from 'utils/transaction';

import { useTransactionContext } from '../internal';

import type { FulfilledTransaction } from './internal';

export const RecipientInfo: FC = () => {
	const { feeAmount, receiver, tokenForFee, network } =
		useTransactionContext<FulfilledTransaction>();

	const { networkIcon, networkName, nativeSymbol } = getNetworkMetadata(
		network as Networks,
	);

	const feeString = `${parseFloat(feeAmount.toPrecision(7))} ${
		tokenForFee?.symbol || nativeSymbol
	}`;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Recipient account</Text>
			<View style={styles.infoBlock}>
				<View style={styles.infoLine}>
					<Text>Address</Text>
					<Text style={styles.infoText}>{receiver.substring(0, 20)}...</Text>
				</View>

				<View style={styles.separatedLine}></View>

				<View style={styles.infoLine}>
					<Text>Network</Text>
					<View style={styles.networkBlock}>
						{networkIcon && <Image style={styles.icon} source={networkIcon} />}

						<Text style={styles.infoText}>{networkName}</Text>
					</View>
				</View>

				<View style={styles.separatedLine}></View>

				<View style={styles.infoLine}>
					<Text>Transaction fee</Text>
					<Text style={styles.infoText}>{feeString}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 12,
	},
	title: {
		fontSize: 14,
		fontWeight: '500',
		color: '#566674',
		marginRight: 'auto',
		marginVertical: 4,
	},
	infoBlock: {
		gap: 12,
	},
	infoLine: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	infoText: {
		color: '#566674',
	},
	networkBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 9,
	},
	separatedLine: {
		height: 1,
		backgroundColor: '#566674',
		opacity: 0.2,
	},
	icon: {
		width: 20,
		height: 20,
		borderRadius: 1000,
	},
});
