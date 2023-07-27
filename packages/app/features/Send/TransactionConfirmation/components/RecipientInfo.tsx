import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionContext,
} from '../../../../state/transaction';

interface Props {
	onBack?: () => void;
}

export const RecipientInfo: FC<Props> = () => {
	const { publicKeys } = useSnapshot(injectedElements);
	const { type, token, nftCollectible, transactionFee, receiver } =
		useSnapshot(transactionContext);

	const publicKey = publicKeys.find(
		(key) =>
			key.network ===
			(type === 'Token' ? token?.network : nftCollectible?.network),
	);

	const iconUri = { uri: '' };
	let networkStr = '';
	let feeStr = '';
	if (publicKey?.network == Networks.solana) {
		iconUri.uri = '/img/network/solana-icon-sm.png';
		networkStr = 'Solana';
		feeStr = `${transactionFee} SOL`;
	} else if (publicKey?.network == Networks.sui) {
		iconUri.uri = '/img/network/sui-icon-sm.png';
		networkStr = 'SUI';
		feeStr = `${transactionFee} SUI`;
	} else if (publicKey?.network == Networks.tezos) {
		iconUri.uri = '/img/network/tezos-icon-sm.png';
		networkStr = 'Tezos';
		feeStr = `${transactionFee} TEZ`;
	}

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
						<Image style={styles.icon} source={iconUri} />
						<Text style={styles.inforText}>{networkStr}</Text>
					</View>
				</View>

				<View style={styles.separatedLine}></View>

				<View style={styles.inforLine}>
					<Text>Network fee</Text>
					<Text style={styles.inforText}>{feeStr}</Text>
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
