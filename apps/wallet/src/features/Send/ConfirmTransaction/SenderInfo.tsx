import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import { usePublicKeys } from 'utils/hooks';
import { getNetworkMetadata } from 'utils/transaction';
import { useSnapshot } from 'valtio';

import { txActions, txContext } from '../context';

interface Props {
	onBack?: () => void;
}

export const SenderInfo: FC<Props> = () => {
	const publicKeys = usePublicKeys();
	const { type, token, collectible } = useSnapshot(txContext).tx;

	const network = type === 'Token' ? token?.network : collectible?.network;
	const publicKey = publicKeys.find((key) => key.network === network);

	if (publicKey) {
		txActions.update({ sender: publicKey._id });
	}

	const { networkIcon, networkName } = getNetworkMetadata(network as Networks);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>From account</Text>
			<View style={styles.inforBlock}>
				{networkIcon && <Image style={styles.icon} source={networkIcon} />}
				<View style={styles.wallet}>
					<Text style={styles.walletTitle}>Wallet 1 {networkName}</Text>
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
