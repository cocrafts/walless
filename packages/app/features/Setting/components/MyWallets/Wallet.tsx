import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { copy, getNetworkInfo } from '@walless/app/utils';
import { shortenAddress } from '@walless/core';
import { Hoverable, Text, View } from '@walless/gui';
import { Copy } from '@walless/icons';
import { modules } from '@walless/ioc';
import type { PublicKeyDocument } from '@walless/store';

interface Props {
	item: PublicKeyDocument;
	index: number;
}

export const Wallet: FC<Props> = ({ item, index }) => {
	const network = getNetworkInfo(item.network);

	const onCopy = async () => {
		await copy(item._id, () => <Copy size={18} color="#FFFFFF" />);
	};

	if (!network) {
		return null;
	}

	return (
		<Hoverable horizontal style={styles.container} onPress={onCopy}>
			<View horizontal style={{ gap: 10 }}>
				<Image
					source={network.icon || modules.asset.setting[network.network].icon}
					style={styles.icon}
				/>

				<View>
					<Text>
						Wallet {index + 1} ({network?.name})
					</Text>
					<Text style={styles.address}>{shortenAddress(item._id)}</Text>
				</View>
			</View>

			<Copy size={18} color={'#566674'} />
		</Hoverable>
	);
};

export default Wallet;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0E141A',
		borderRadius: 16,
		padding: 12,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	icon: {
		width: 30,
		height: 30,
		borderRadius: 15,
	},
	address: {
		fontSize: 12,
		color: '#566674',
	},
});
