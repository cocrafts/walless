import type { FC } from 'react';
import type { ImageURISource } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { SolanaTransferHistoryV2 as SolanaTransferHistoryItem } from '@walless/core';
import type { TransactionHistoryDocument } from '@walless/store';
import assets from 'utils/assets';
import { getNetworkInfo } from 'utils/helper';

import ItemAddress from './ItemAddress';
import ItemAmount from './ItemAmount';
import ItemTokenIcon from './ItemTokenIcon';
import WrappedHistory from './WrappedHistory';

interface Props {
	transaction: TransactionHistoryDocument<SolanaTransferHistoryItem>;
}

const SolanaTransferHistoryItem: FC<Props> = ({ transaction }) => {
	const { transactionType, amount, network, sender, receiver, status, token } =
		transaction;
	const networkInfo = getNetworkInfo(network);
	const address = transactionType === 'Sent' ? receiver : sender;
	const icon = token.image ? { uri: token.image } : assets.misc.unknownToken;

	return (
		<WrappedHistory transaction={transaction}>
			<View style={styles.leftPartContainer}>
				<ItemTokenIcon type={transactionType} status={status} icon={icon} />
				<ItemAddress
					type={transactionType}
					address={address}
					imageUri={networkInfo?.icon as ImageURISource}
				/>
			</View>

			<ItemAmount
				amount={amount}
				type={transactionType}
				status={status}
				tokenSymbol={token.symbol}
			/>
		</WrappedHistory>
	);
};

export default SolanaTransferHistoryItem;

const styles = StyleSheet.create({
	leftPartContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginRight: 10,
	},
	balance: {
		textAlign: 'right',
	},
	networkIcon: {
		width: 16,
		height: 16,
		borderRadius: 4,
	},
});
