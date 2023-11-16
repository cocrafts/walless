import type { FC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import QRCodeSVG from '../components/QRCode';
import WalletAddress from '../components/WalletAddress';

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
			<QRCodeSVG value={address} size={200} />
			<WalletAddress
				network={network}
				networkIcon={networkIcon}
				address={address}
			/>
		</View>
	);
};

export default WalletCard;

const styles = StyleSheet.create({
	container: {
		height: 400,
		justifyContent: 'space-between',
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
