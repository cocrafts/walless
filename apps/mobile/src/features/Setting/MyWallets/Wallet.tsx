import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { shortenAddress } from '@walless/core';
import { Hoverable, Text, View } from '@walless/gui';
import { Copy } from '@walless/icons';
import { HapticFeedbackTypes, modules } from '@walless/ioc';
import type { PublicKeyDocument } from '@walless/store';
import { showCopiedModal } from 'modals/Notification';
import { getNetworkInfo, type NetworkInfo } from 'utils/helper';
import { copy } from 'utils/system';

interface Props {
	item: PublicKeyDocument;
	index: number;
}

export const Wallet: FC<Props> = ({ item, index }) => {
	const network = getNetworkInfo(item.network) as NetworkInfo;

	const onCopy = async () => {
		modules.native.triggerHaptic(HapticFeedbackTypes.impactHeavy);
		await copy(item._id);
		showCopiedModal();
	};

	return (
		<Hoverable horizontal style={styles.container} onPress={onCopy}>
			<View horizontal style={{ gap: 10 }}>
				<Image source={network.icon} style={styles.icon} />

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
