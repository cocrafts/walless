import { Image, StyleSheet } from 'react-native';
import { Anchor, Text, View } from '@walless/gui';
import { ResponseCode } from '@walless/messaging';
import { useSnapshot } from 'valtio';

import { txContext } from '../context';

export const Nft = () => {
	const { collectible, time, status, signatureString } =
		useSnapshot(txContext).tx;

	const iconUri = { uri: collectible?.metadata?.imageUri };

	return (
		<View style={styles.container}>
			<Image style={styles.nftIcon} source={iconUri} />
			<View style={styles.amountContainer}>
				<Text style={styles.amountText}>{collectible?.metadata?.name}</Text>
				<Text style={styles.dateText}>{time?.toLocaleString()}</Text>
			</View>
			<View>
				{status == ResponseCode.SUCCESS && (
					<Anchor
						style={styles.shareButton}
						title="View on Solscan"
						href={`https://solscan.io/tx/${signatureString}?cluster=devnet`}
					/>
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
	shareButton: {
		borderRadius: 10,
		paddingHorizontal: 30,
		paddingVertical: 5,
	},
});
