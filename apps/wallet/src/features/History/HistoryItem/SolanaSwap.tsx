import type { FC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Linking, StyleSheet, View } from 'react-native';
import type { SolanaSwapHistory } from '@walless/core';
import { Networks } from '@walless/core';
import type { HistoryDocument } from '@walless/store';
import assets from 'utils/assets';
import { getNetworkInfo } from 'utils/helper';
import { usePublicKeys } from 'utils/hooks';

import ItemAddress from './ItemAddress';
import ItemAmount from './ItemAmount';
import ItemTokenIcon from './ItemTokenIcon';
import WrappedHistory from './WrappedHistory';

interface Props {
	transaction: HistoryDocument<SolanaSwapHistory>;
}

export const SolanaSwapHistoryItem: FC<Props> = ({ transaction }) => {
	const {
		transactionType,
		network,
		status,
		receivedToken,
		sentToken,
		signature,
	} = transaction;
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
			<View style={styles.rightPartContainer}>
				<ItemAmount
					amount={receivedToken.amount}
					type="Received"
					status={status}
					tokenSymbol={receivedToken.metadata.symbol}
				/>
				<ItemAmount
					amount={sentToken.amount}
					type="Sent"
					status={status}
					tokenSymbol={sentToken.metadata.symbol}
				/>
			</View>
		</WrappedHistory>
	);
};

export default SolanaSwapHistoryItem;

const styles = StyleSheet.create({
	leftPartContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	rightPartContainer: {
		alignItems: 'flex-end',
	},
});
