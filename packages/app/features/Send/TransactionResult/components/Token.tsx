import { Image, StyleSheet } from 'react-native';
import { appState } from '@walless/app';
import { Anchor, Text, View } from '@walless/gui';
import { ResponseCode } from '@walless/messaging';
import { useSnapshot } from 'valtio';

import { transactionContext } from '../../../../state/transaction';

export const Token = () => {
	const { endpoints } = useSnapshot(appState);
	const { token, amount, time, status, signatureString } =
		useSnapshot(transactionContext);

	const iconUri = {
		uri: token?.metadata?.imageUri ?? 'img/send-token/unknown-token.jpeg',
	};

	let endpoint = 'devnet';

	if (token?.network == 'solana') {
		endpoint = endpoints.solana;
	} else if (token?.network == 'sui') {
		endpoint = endpoints.sui;
	} else if (token?.network == 'tezos') {
		endpoint = endpoints.tezos;
	}

	return (
		<View style={styles.container}>
			<Image style={styles.tokenIcon} source={iconUri} />
			<View style={styles.amountContainer}>
				<Text style={styles.amountText}>{amount}</Text>
				<Text style={styles.symbolText}>{token?.metadata?.symbol}</Text>
			</View>
			<Text style={styles.dateText}>{time?.toLocaleString()}</Text>
			<View>
				{status == ResponseCode.SUCCESS && (
					<Anchor
						style={styles.shareButton}
						title="View on Solscan"
						href={`https://solscan.io/tx/${signatureString}?cluster=${endpoint}`}
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
