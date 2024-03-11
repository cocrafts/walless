import { Image, StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';

import type { FulfilledNftTransaction } from '../ConfirmTransaction/internal';
import { useTransactionContext } from '../internal';

import { SolanaShareButton } from './ShareButton';

export const Nft = () => {
	const { nft, network, status, time } =
		useTransactionContext<FulfilledNftTransaction>();

	const iconUri = { uri: nft.image };

	return (
		<View style={styles.container}>
			<Image style={styles.nftIcon} source={iconUri} />
			<View style={styles.amountContainer}>
				<Text style={styles.amountText}>{nft.name}</Text>
				<Text style={styles.dateText}>{time?.toLocaleString()}</Text>
			</View>
			<View>
				{status == 'success' && network === Networks.solana && (
					<SolanaShareButton />
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: '100%',
		gap: 10,
	},
	nftIcon: {
		width: 100,
		height: 100,
	},
	amountContainer: {
		alignItems: 'center',
		marginBottom: 6,
	},
	amountText: {
		fontSize: 20,
		fontWeight: '500',
		color: '#FFFFFF',
	},
	dateText: {
		fontSize: 12,
		color: '#566674',
	},
	shareBlock: {
		height: 30,
	},
});
