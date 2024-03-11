import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { GreenTag, RedTag } from 'components/tags';
import { getNetworkMetadata } from 'utils/transaction';

import type { FulfilledTransaction } from '../ConfirmTransaction/internal';
import { useTransactionContext } from '../internal';

export const Information = () => {
	const { network, feeAmount, receiver, sender, status, tokenForFee } =
		useTransactionContext<FulfilledTransaction>();

	const { networkIcon, networkName, nativeSymbol } =
		getNetworkMetadata(network);

	const feeString = `${parseFloat(feeAmount.toPrecision(7))} ${
		tokenForFee?.symbol || nativeSymbol
	}`;

	return (
		<View style={styles.container}>
			<View style={styles.infoLine}>
				<Text>From</Text>
				<Text style={styles.infoText}>{sender.substring(0, 20)}...</Text>
			</View>

			<View style={styles.separatedLine}></View>

			<View style={styles.infoLine}>
				<Text>Status</Text>
				<Text style={styles.infoText}> </Text>
				{status == 'success' && <GreenTag title="Success" />}
				{status == 'failed' && <RedTag title="Failed" />}
			</View>

			<View style={styles.separatedLine}></View>

			<View style={styles.infoLine}>
				<Text>To</Text>
				<Text style={styles.infoText}>{receiver.substring(0, 20)}...</Text>
			</View>

			<View style={styles.separatedLine}></View>

			<View style={styles.infoLine}>
				<Text>Network</Text>
				<View style={styles.networkBlock}>
					{networkIcon && <Image style={styles.icon} source={networkIcon} />}
					<Text style={styles.infoText}>{networkName}</Text>
				</View>
			</View>

			<View style={styles.separatedLine}></View>

			<View style={styles.infoLine}>
				<Text>Transaction fee</Text>
				<Text style={styles.infoText}>{feeString}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 14,
	},
	infoLine: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	infoText: {
		color: '#566674',
	},
	networkBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 9,
	},
	separatedLine: {
		height: 1,
		backgroundColor: '#566674',
		opacity: 0.2,
	},
	icon: {
		width: 20,
		height: 20,
		borderRadius: 1000,
	},
});
