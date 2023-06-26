import { type FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../../state/transaction';

interface Props {
	onBack?: () => void;
}

export const SenderInfor: FC<Props> = () => {
	const { publicKeys } = useSnapshot(injectedElements);
	const { token } = useSnapshot(transactionContext);

	const publicKey = publicKeys.find((key) => key.network == token?.network);

	if (publicKey) {
		transactionActions.setSender(publicKey._id);
	}

	const iconUri = { uri: '' };
	let walletTitle = '';
	if (publicKey?.network == Networks.solana) {
		iconUri.uri = 'img/network/solana-icon-sm.png';
		walletTitle = 'Solana';
	} else if (publicKey?.network == Networks.sui) {
		iconUri.uri = 'img/network/sui-icon-sm.png';
		walletTitle = 'SUI';
	} else if (publicKey?.network == Networks.tezos) {
		iconUri.uri = 'img/network/tezos-icon-sm.png';
		walletTitle = 'Tezos';
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>From account</Text>
			<View style={styles.inforBlock}>
				<Image style={styles.icon} source={iconUri} />
				<View style={styles.wallet}>
					<Text style={styles.walletTitle}>Wallet 1 {`(${walletTitle})`}</Text>
					<Text style={styles.walletAddress}>
						{publicKey ? publicKey._id.substring(0, 26) : 'Loading'} ...
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 12,
	},
	title: {
		fontSize: 14,
		fontWeight: '500',
		color: '#566674',
		marginRight: 'auto',
	},
	inforBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#0F151A',
		width: 336,
		height: 65,
		paddingHorizontal: 15,
		borderRadius: 15,
		gap: 17,
	},
	icon: {
		height: 35,
		width: 35,
		borderRadius: 1000,
	},
	wallet: {
		flexDirection: 'column',
		gap: 4,
	},
	walletTitle: {
		fontSize: 14,
		fontWeight: '600',
	},
	walletAddress: {
		fontSize: 12,
		fontWeight: '500',
		color: '#566674',
	},
});
