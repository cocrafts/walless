import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import { modules } from '@walless/ioc';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../../state';

interface Props {
	onBack?: () => void;
}

export const SenderInfo: FC<Props> = () => {
	const { publicKeys } = useSnapshot(injectedElements);
	const { type, token, nftCollectible } = useSnapshot(transactionContext);

	const publicKey = publicKeys.find(
		(key) =>
			key.network ===
			(type === 'Token' ? token?.network : nftCollectible?.network),
	);

	if (publicKey) {
		transactionActions.setSender(publicKey._id);
	}

	let iconUri;
	let walletTitle = '';
	if (publicKey?.network == Networks.solana) {
		iconUri = modules.asset.widget.solana.storeMeta.iconUri;
		walletTitle = 'Solana';
	} else if (publicKey?.network == Networks.sui) {
		iconUri = modules.asset.widget.sui.storeMeta.iconUri;
		walletTitle = 'Sui';
	} else if (publicKey?.network == Networks.tezos) {
		iconUri = modules.asset.widget.tezos.storeMeta.iconUri;
		walletTitle = 'Tezos';
	} else if (publicKey?.network === Networks.aptos) {
		iconUri = modules.asset.widget.aptos.storeMeta.iconUri;
		walletTitle = 'Aptos';
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>From account</Text>
			<View style={styles.inforBlock}>
				{iconUri && <Image style={styles.icon} source={iconUri} />}
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
		backgroundColor: '#0F151A',
		padding: 15,
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
