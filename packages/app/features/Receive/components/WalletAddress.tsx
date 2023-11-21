import type { FC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Copy } from '@walless/icons';

import { copy } from '../../../utils';

interface Props {
	network: string;
	networkIcon: ImageSourcePropType;
	address: string;
}

const WalletAddress: FC<Props> = ({ network, networkIcon, address }) => {
	const handleCopied = async () => {
		await copy(address, () => <Copy size={18} color="#FFFFFF" />);
	};

	return (
		<Button style={styles.container} onPress={handleCopied}>
			<Image style={styles.networkIcon} source={networkIcon} />
			<View style={styles.textBlock}>
				<Text style={styles.network}>{network}</Text>
				<Text style={styles.address}>{address.substring(0, 16) + '...'}</Text>
			</View>

			<Copy color="#566674" size={20} />
		</Button>
	);
};

export default WalletAddress;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#0E141A',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 14,
		gap: 12,
	},
	networkIcon: {
		width: 36,
		height: 36,
		borderRadius: 36,
	},
	textBlock: {
		flex: 1,
		gap: 2,
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
	},
});
