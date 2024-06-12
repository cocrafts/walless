import { Image, StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import assets from 'utils/assets';

import type { FulfilledTokenTransaction } from '../ConfirmTransaction/internal';
import { useTransactionContext } from '../internal';

import { SolanaShareButton } from './ShareButton';

export const Token = () => {
	const { token, amount, time, status, network } =
		useTransactionContext<FulfilledTokenTransaction>();

	if (!token) return null;

	const icon = token.image ? { uri: token.image } : assets.misc.unknownToken;

	return (
		<View style={styles.container}>
			<Image style={styles.tokenIcon} source={icon} />
			<View style={styles.amountContainer}>
				<Text style={styles.amountText}>{amount}</Text>
				<Text style={styles.symbolText}>{token.symbol}</Text>
			</View>
			<Text style={styles.dateText}>{time?.toLocaleString()}</Text>
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
		gap: 11,
	},
	tokenIcon: {
		width: 57,
		height: 57,
		borderRadius: 1000,
	},
	amountContainer: {
		flexDirection: 'row',
		gap: 6,
	},
	amountText: {
		fontSize: 20,
		fontWeight: '500',
		color: '#FFFFFF',
	},
	symbolText: {
		fontSize: 20,
		fontWeight: '500',
		color: '#ffffff',
	},
	dateText: {
		fontSize: 12,
		color: '#566674',
	},
	shareBlock: {
		height: 30,
	},
	shareButton: {
		borderRadius: 10,
		paddingHorizontal: 30,
		paddingVertical: 5,
	},
});
