import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Copy } from '@walless/icons';

import { copy } from '../../../utils';

interface Props {
	network: string;
	networkIcon: string;
	address: string;
}

const WalletAddress: FC<Props> = ({ network, networkIcon, address }) => {
	const handleCopied = async () => {
		await copy(address, () => <Copy size={18} color="#FFFFFF" />);
	};

	return (
		<Button style={styles.container} onPress={handleCopied}>
			<Image style={styles.networkIcon} source={{ uri: networkIcon }} />
			<View>
				<Text style={styles.network}>{network}</Text>
				<Text style={styles.address}>{address}</Text>
			</View>

			<Copy color="#566674" size={24} />
		</Button>
	);
};

export default WalletAddress;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#0E141A',
		width: 308,
		height: 48,
		borderRadius: 8,
		gap: 12,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	networkIcon: {
		width: 36,
		height: 36,
		borderRadius: 36,
	},
	network: {
		fontSize: 16,
		fontWeight: '500',
		color: '#FFFFFF',
	},
	address: {
		fontWeight: '400',
		color: '#566674',
		fontSize: 14,
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		width: 100,
	},
});
