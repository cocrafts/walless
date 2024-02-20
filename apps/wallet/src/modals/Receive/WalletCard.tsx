import type { FC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import QRCode from 'components/QRCode';
import Wallet from 'components/Wallet';

import type { SlideOption } from './Slider';

interface Props {
	config: SlideOption;
}

export interface WalletProps {
	network: string;
	networkIcon: ImageSourcePropType;
	address: string;
}

const WalletCard: FC<Props> = ({ config }) => {
	const { network, networkIcon, address } = config.context as WalletProps;

	return (
		<View style={styles.container}>
			<QRCode value={address} size={200} />
			<Wallet name={network} address={address} icon={networkIcon} />
		</View>
	);
};

export default WalletCard;

const styles = StyleSheet.create({
	container: {
		gap: 40,
		backgroundColor: '#242F38',
		borderRadius: 16,
		paddingTop: 50,
		paddingBottom: 24,
		paddingHorizontal: 24,
	},
	qr: {
		alignItems: 'center',
	},
});
