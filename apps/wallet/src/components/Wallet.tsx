import type { FC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { shortenAddress } from '@walless/core';
import { Hoverable, Text, View } from '@walless/gui';
import { Copy } from '@walless/icons';
import { showCopiedModal } from 'modals/Notification';
import { HapticFeedbackTypes, nativeModules } from 'utils/native';
import { copy } from 'utils/system';

interface Props {
	name: string;
	address: string;
	icon: ImageSourcePropType;
}

export const Wallet: FC<Props> = ({ name, address, icon }) => {
	const onCopy = async () => {
		nativeModules.triggerHaptic(HapticFeedbackTypes.impactHeavy);
		await copy(address);
		showCopiedModal();
	};

	return (
		<Hoverable horizontal style={styles.container} onPress={onCopy}>
			<View style={styles.infoContainer}>
				<Image source={icon} style={styles.icon} />

				<View>
					<Text>{name}</Text>
					<Text style={styles.address}>{shortenAddress(address)}</Text>
				</View>
			</View>

			<Copy size={18} color="#566674" />
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
	infoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
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
