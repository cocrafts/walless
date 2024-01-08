import { Image, StyleSheet } from 'react-native';
import { appState } from '@walless/engine';
import { Anchor, Text, View } from '@walless/gui';
import { modules } from '@walless/ioc';
import { ResponseCode } from '@walless/messaging';
import { useSnapshot } from 'valtio';

import { txContext } from '../context';

export const Token = () => {
	const { endpoints } = useSnapshot(appState);
	const { token, amount, time, status, signatureString } =
		useSnapshot(txContext).tx;

	const icon = token?.metadata?.imageUri
		? { uri: token?.metadata?.imageUri }
		: modules.asset.misc.unknownToken;

	const endpoint = endpoints[token?.network as never];

	return (
		<View style={styles.container}>
			<Image style={styles.tokenIcon} source={icon} />
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
