import type { FC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Linking, StyleSheet, Text, View } from 'react-native';
import type { SolanaUnknownHistory } from '@walless/core';
import { Networks, shortenAddress } from '@walless/core';
import type { TransactionHistoryDocument } from '@walless/store';
import assets from 'utils/assets';
import { getNetworkInfo } from 'utils/helper';
import { usePublicKeys } from 'utils/hooks';

import ItemAddress from './ItemAddress';
import ItemTokenIcon from './ItemTokenIcon';
import WrappedHistory from './WrappedHistory';

interface Props {
	transaction: TransactionHistoryDocument<SolanaUnknownHistory>;
}

export const SolanaUnknownHistoryItem: FC<Props> = ({ transaction }) => {
	const { transactionType, signature, network } = transaction;
	const networkInfo = getNetworkInfo(network);
	const [walletAddress] = usePublicKeys(Networks.solana);

	return (
		<WrappedHistory
			transaction={transaction}
			onPress={() => Linking.openURL(`https://solscan.io/tx/${signature}`)}
		>
			<View style={styles.leftPartContainer}>
				<ItemTokenIcon
					type={transactionType}
					status={status}
					icon={assets.misc.unknownToken}
				/>
				<ItemAddress
					type={transactionType}
					address={walletAddress._id}
					imageUri={networkInfo?.icon as ImageSourcePropType}
				/>
			</View>
			<Text style={styles.signatureStyle}>{shortenAddress(signature)}</Text>
		</WrappedHistory>
	);
};

export default SolanaUnknownHistoryItem;

const styles = StyleSheet.create({
	leftPartContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginRight: 10,
	},
	rightPartContainer: {
		alignItems: 'flex-end',
	},
	signatureStyle: {
		color: '#ffffff',
	},
});
