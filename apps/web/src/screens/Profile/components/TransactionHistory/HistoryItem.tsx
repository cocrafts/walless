import { type FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { shortenAddress } from '@walless/core';
import type { Transaction } from '@walless/engine/solana/transaction';
import {
	AnimateDirections,
	BindDirections,
	Hoverable,
	modalActions,
} from '@walless/gui';
import { ArrowBottomRight, ArrowTopRight } from '@walless/icons';
import type { IconProps } from '@walless/icons/components/types';
import { getNetworkInfo } from 'utils/helper';

import TransactionDetails from './TransactionDetails';

const HistoryItem: FC<Transaction> = (transaction) => {
	const { type, amount, network, sender, receiver, status, token } =
		transaction;
	const networkInfo = getNetworkInfo(network);
	let Icon: FC<IconProps> = ArrowTopRight;
	let address = sender;
	let color = '#ffffff';
	let changeBalance = `- ${amount}`;

	if (type === 'sent') {
		if (status === 'failed') {
			color = '#DE4747';
		}
	} else {
		Icon = ArrowBottomRight;
		address = receiver;
		color = '#2FC879';
		changeBalance = `+ ${amount}`;
	}

	const handleShowDetailsModal = () => {
		modalActions.show({
			id: 'transactionDetails',
			component: () => <TransactionDetails {...transaction} />,
			bindingDirection: BindDirections.InnerBottom,
			animateDirection: AnimateDirections.Top,
		});
	};

	return (
		<Hoverable style={styles.container} onPress={handleShowDetailsModal}>
			<View style={styles.contentContainer}>
				<View style={styles.leftPartContainer}>
					<View style={styles.imageContainer}>
						<Image
							source={{
								uri:
									token.metadata?.imageUri ??
									'/img/network-solana/solana-icon.svg',
							}}
							style={{
								width: 32,
								height: 32,
								borderRadius: token.metadata?.mpl ? 8 : 32,
							}}
						/>
						<View style={styles.iconContainer}>
							<Icon size={14} color={color} />
						</View>
					</View>
					<View style={{ gap: 4 }}>
						<Text style={styles.text}>
							{type.charAt(0).toUpperCase() + type.slice(1)}
						</Text>
						<View style={styles.addressContainer}>
							<Image
								source={{
									uri:
										networkInfo?.icon ?? '/img/network-solana/solana-icon.svg',
								}}
								style={{ width: 16, height: 16, borderRadius: 4 }}
							/>
							<Text
								numberOfLines={1}
								ellipsizeMode="middle"
								style={styles.address}
							>
								{shortenAddress(address)}
							</Text>
						</View>
					</View>
				</View>

				<Text
					style={[styles.balance, { color: color }]}
					numberOfLines={1}
					ellipsizeMode={'tail'}
				>
					{changeBalance} {token.metadata?.symbol ?? 'SOL'}
				</Text>
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
	imageContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 16,
		height: 16,
		borderRadius: 16,
		backgroundColor: '#131C24',
		marginLeft: -8,
		marginBottom: -4,
	},
	addressContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	transactionTypeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	text: {
		color: '#ffffff',
	},
	address: {
		flex: 1,
		color: '#566674',
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
});
