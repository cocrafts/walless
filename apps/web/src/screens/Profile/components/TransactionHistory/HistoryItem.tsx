import { type FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ArrowBottomRight, ArrowTopRight } from '@walless/icons';
import type { IconProps } from '@walless/icons/components/types';
import type { HistoryItemProps } from 'screens/Profile/internal';
import { getNetworkInfo } from 'utils/helper';

const HistoryItem: FC<HistoryItemProps> = ({
	id,
	type,
	status,
	toAddress,
	fromAddress,
	amount,
	network,
}) => {
	const networkInfo = getNetworkInfo(network);
	let Icon: FC<IconProps> = ArrowTopRight;
	let address = `From: ${fromAddress}`;
	let color = '#ffffff';
	let changeBalance = `- ${amount}`;

	if (type === 'sent') {
		if (status === 'failed') {
			color = '#DE4747';
		}
	} else {
		Icon = ArrowBottomRight;
		address = `To: ${toAddress}`;
		color = '#2FC879';
		changeBalance = `+ ${amount}`;
	}

	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<View style={styles.leftPartContainer}>
					<View>
						<Image
							source={{
								uri: networkInfo?.icon ?? '/img/network-solana/solana-icon.svg',
							}}
							style={{ width: 32, height: 32, borderRadius: 16 }}
						/>
					</View>
					<View>
						<View style={styles.transactionTypeContainer}>
							<Icon size={14} color={color} />
							<Text style={styles.text}>
								{type.charAt(0).toUpperCase() + type.slice(1)}
							</Text>
						</View>
						<Text style={styles.address}>{address}</Text>
					</View>
				</View>

				<Text style={{ color: color }}>{changeBalance}</Text>
			</View>
		</View>
	);
};

export default HistoryItem;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexDirection: 'row',
		width: '100%',
	},
	contentContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		backgroundColor: '#131C24',
		padding: 10,
		borderRadius: 8,
	},
	addressContainer: {},
	transactionTypeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	text: {
		color: '#ffffff',
	},
	address: {
		color: '#566674',
	},
	leftPartContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
});
