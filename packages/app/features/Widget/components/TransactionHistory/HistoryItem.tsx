import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { getNetworkInfo } from '@walless/app/utils';
import type { Transaction } from '@walless/core';
import {
	AnimateDirections,
	BindDirections,
	Hoverable,
	modalActions,
} from '@walless/gui';

import ItemAddress from './components/ItemAddress';
import ItemAmount from './components/ItemAmount';
import ItemTokenIcon from './components/ItemTokenIcon';
import TransactionDetails from './TransactionDetails';

const HistoryItem: FC<Transaction> = (transaction) => {
	const { type, amount, network, sender, receiver, status, token } =
		transaction;
	const networkInfo = getNetworkInfo(network);
	const address = type === 'sent' ? receiver : sender;

	const handleShowDetailsModal = () => {
		modalActions.show({
			id: 'Transaction Details',
			component: () => <TransactionDetails {...transaction} />,
			bindingDirection: BindDirections.InnerBottom,
			animateDirection: AnimateDirections.Top,
		});
	};

	return (
		<Hoverable style={styles.container} onPress={handleShowDetailsModal}>
			<View style={styles.contentContainer}>
				<View style={styles.leftPartContainer}>
					<ItemTokenIcon
						type={type}
						status={status}
						imageUri={token.metadata?.imageUri}
						isCollectible={!!token.metadata?.mpl}
					/>
					<ItemAddress
						type={type}
						address={address}
						imageUri={networkInfo?.icon}
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