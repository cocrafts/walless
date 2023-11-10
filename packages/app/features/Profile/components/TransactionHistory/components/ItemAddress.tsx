import type { FC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { shortenAddress } from '@walless/core';
import { Text, View } from '@walless/gui';

interface Props {
	type: 'sent' | 'received';
	address: string;
	imageUri: ImageSourcePropType;
}

export const ItemAddress: FC<Props> = ({ type, address, imageUri }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				{type.charAt(0).toUpperCase() + type.slice(1)}
			</Text>
			<View style={styles.addressContainer}>
				<Image source={imageUri} style={styles.networkIcon} />
				<Text numberOfLines={1} ellipsizeMode="middle" style={styles.address}>
					{shortenAddress(address)}
				</Text>
			</View>
		</View>
	);
};

export default ItemAddress;

const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
	addressContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	text: {
		color: '#ffffff',
	},
	networkIcon: {
		width: 16,
		height: 16,
		borderRadius: 4,
	},
	address: {
		flex: 1,
		color: '#566674',
	},
});
