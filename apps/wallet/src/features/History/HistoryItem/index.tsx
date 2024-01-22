import type { FC } from 'react';
import type { ImageURISource } from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { TransactionHistory } from '@walless/core';
import { Hoverable } from '@walless/gui';
import { showTransactionDetailsModal } from 'modals/TransactionDetailsModal';
import assets from 'utils/assets';
import { getNetworkInfo } from 'utils/helper';

import ItemAddress from './ItemAddress';
import ItemAmount from './ItemAmount';
import ItemTokenIcon from './ItemTokenIcon';

const HistoryItem: FC<TransactionHistory> = (transaction) => {
	const { type, amount, network, sender, receiver, status, token } =
		transaction;
	const networkInfo = getNetworkInfo(network);
	const address = type === 'Sent' ? receiver : sender;

	const icon = token.metadata?.imageUri
		? { uri: token.metadata.imageUri }
		: assets.misc.unknownToken;

	return (
		<Hoverable
			style={styles.container}
			onPress={() => showTransactionDetailsModal({ transaction })}
		>
			<View style={styles.contentContainer}>
				<View style={styles.leftPartContainer}>
					<ItemTokenIcon
						type={type}
						status={status}
						icon={icon}
						isCollectible={!!token.metadata?.mpl}
					/>
					<ItemAddress
						type={type}
						address={address}
						imageUri={networkInfo?.icon as ImageURISource}
					/>
				</View>

				<ItemAmount
					amount={amount}
					type={type}
					status={status}
					tokenSymbol={token.metadata?.symbol}
				/>
			</View>
		</Hoverable>
	);
};

export default HistoryItem;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexDirection: 'row',
		overflow: 'hidden',
	},
	contentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		backgroundColor: '#131C24',
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 8,
	},
	leftPartContainer: {
		width: '70%',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
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
