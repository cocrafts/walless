import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { getNetworkMetadata } from 'utils/transaction';

import { useTransactionContext } from '../internal';

import type { FulfilledTransaction } from './internal';

interface Props {
	onBack?: () => void;
}

export const SenderInfo: FC<Props> = () => {
	const { network, sender } = useTransactionContext<FulfilledTransaction>();

	const { networkIcon, networkName } = getNetworkMetadata(network);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>From account</Text>
			<View style={styles.infoBlock}>
				{networkIcon && <Image style={styles.icon} source={networkIcon} />}
				<View style={styles.wallet}>
					<Text style={styles.walletTitle}>Wallet 1 {networkName}</Text>
					<Text style={styles.walletAddress}>
						{sender.substring(0, 26)} ...
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
	infoBlock: {
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
