import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import { getNetworkMetadata } from 'utils/transaction';
import { useSnapshot } from 'valtio';

import { txContext } from '../context';

export const RecipientInfo: FC = () => {
	const { transactionFee, receiver, tokenForFee, type, token, collectible } =
		useSnapshot(txContext).tx;

	const network = type === 'Token' ? token?.network : collectible?.network;
	const { networkIcon, networkName, nativeSymbol } = getNetworkMetadata(
		network as Networks,
	);

	const feeString = `${transactionFee} ${
		tokenForFee?.metadata?.symbol || nativeSymbol
	}`;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Recipient account</Text>
			<View style={styles.inforBlock}>
				<View style={styles.inforLine}>
					<Text>Address</Text>
					<Text style={styles.inforText}>{receiver.substring(0, 20)}...</Text>
				</View>

				<View style={styles.separatedLine}></View>

				<View style={styles.inforLine}>
					<Text>Network</Text>
					<View style={styles.networkBlock}>
						{networkIcon && <Image style={styles.icon} source={networkIcon} />}

						<Text style={styles.inforText}>{networkName}</Text>
					</View>
				</View>

				<View style={styles.separatedLine}></View>

				<View style={styles.inforLine}>
					<Text>Transaction fee</Text>
					<Text style={styles.inforText}>{feeString}</Text>
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
	inforBlock: {
		gap: 16,
	},
	inforLine: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	inforText: {
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
