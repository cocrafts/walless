import { type FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Notification } from '@walless/app';
import { shortenAddress } from '@walless/core';
import {
	BindDirections,
	Hoverable,
	modalActions,
	Text,
	View,
} from '@walless/gui';
import { Copy } from '@walless/icons';
import { PublicKeyDocument } from '@walless/store';
import { getNetworkInfo } from 'utils/helper';

interface Props {
	item: PublicKeyDocument;
	index: number;
}

export const Wallet: FC<Props> = ({ item, index }) => {
	const network = getNetworkInfo(item.network);
	const onCopy = () => {
		navigator.clipboard.writeText(item._id as string);

		const StyledCopy = () => <Copy size={18} color="#FFFFFF" />;

		modalActions.show({
			id: 'copied_announcement',
			component: Notification,
			bindingDirection: BindDirections.InnerTopRight,
			positionOffset: { x: 0, y: 20 },
			maskActiveOpacity: 0,
			context: {
				prefix: StyledCopy,
				message: 'Copied',
			},
		});

		setTimeout(() => {
			modalActions.hide('copied_announcement');
		}, 1000);
	};

	return (
		<Hoverable horizontal style={styles.container} onPress={onCopy}>
			<View horizontal style={{ gap: 10 }}>
				<Image source={network?.icon as never} style={styles.icon} />

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
