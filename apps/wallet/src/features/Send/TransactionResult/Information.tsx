import { Image, StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { ResponseCode } from '@walless/core';
import { Text, View } from '@walless/gui';
import { GreenTag, RedTag } from 'components/tags';
import { getNetworkMetadata } from 'utils/transaction';
import { useSnapshot } from 'valtio';

import { txContext } from '../context';

export const Information = () => {
	const {
		type,
		token,
		collectible,
		transactionFee,
		receiver,
		sender,
		status,
		tokenForFee,
	} = useSnapshot(txContext).tx;

	const network = type === 'Token' ? token?.network : collectible?.network;

	const { networkIcon, networkName, nativeSymbol } = getNetworkMetadata(
		network as Networks,
	);

	const feeString = `${transactionFee} ${
		tokenForFee?.metadata?.symbol || nativeSymbol
	}`;

	return (
		<View style={styles.container}>
			<View style={styles.inforLine}>
				<Text>From</Text>
				<Text style={styles.inforText}>{sender.substring(0, 20)}...</Text>
			</View>

			<View style={styles.separatedLine}></View>

			<View style={styles.inforLine}>
				<Text>Status</Text>
				<Text style={styles.inforText}> </Text>
				{status == ResponseCode.SUCCESS && <GreenTag title="Success" />}
				{status == ResponseCode.ERROR && <RedTag title="Failed" />}
			</View>

			<View style={styles.separatedLine}></View>

			<View style={styles.inforLine}>
				<Text>To</Text>
				<Text style={styles.inforText}>{receiver.substring(0, 20)}...</Text>
			</View>

			<View style={styles.separatedLine}></View>

			<View style={styles.inforLine}>
				<Text>Network</Text>
				<View style={styles.networkBlock}>
					{networkIcon && <Image style={styles.icon} source={networkIcon} />}
					<Text style={styles.inforText}>{networkName}</Text>
				</View>
			</View>

			<View style={styles.separatedLine}></View>

			<View style={styles.inforLine}>
				<Text>Transaction fee</Text>
				<Text style={styles.inforText}>{feeString}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 14,
	},
	inforLine: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	inforText: {
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
