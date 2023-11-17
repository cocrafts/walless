import type { FC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { shortenAddress } from '@walless/core';
import { Text, View } from '@walless/gui';
import { ArrowDown } from '@walless/icons';

interface Props {
	sender: string;
	receiver: string;
	profileImage?: ImageSourcePropType;
	networkImage?: ImageSourcePropType;
	type: 'Sent' | 'Received';
}

const AddressDetails: FC<Props> = ({
	receiver,
	sender,
	profileImage = { uri: '' },
	networkImage = { uri: '' },
	type,
}) => {
	let senderImage;
	let receiverImage;
	if (type === 'Sent') {
		senderImage = profileImage;
		receiverImage = networkImage;
	} else {
		senderImage = networkImage;
		receiverImage = profileImage;
	}

	return (
		<View style={styles.container}>
			<View style={styles.fromToContainer}>
				<Text>From</Text>
				<Text>To</Text>
			</View>

			<View style={styles.transferContainer}>
				<View style={styles.addressContainer}>
					<Image source={senderImage} style={styles.profileImage} />
					<Text>{shortenAddress(sender)}</Text>
				</View>
				<View style={styles.arrowContainer}>
					<ArrowDown size={16} color="#0694D3" />
				</View>
				<View style={styles.addressContainer}>
					<Image source={receiverImage} style={styles.profileImage} />
					<Text>{shortenAddress(receiver)}</Text>
				</View>
			</View>
		</View>
	);
};

export default AddressDetails;

const styles = StyleSheet.create({
	container: {
		gap: 12,
	},
	transferContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#131C24',
		borderRadius: 8,
		padding: 16,
	},
	addressContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	fromToContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	arrowContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		transform: [{ rotate: '270deg' }],
		borderWidth: 1,
		borderColor: '#0694D3',
		borderRadius: 50,
		padding: 4,
	},
	profileImage: {
		width: 24,
		height: 24,
		borderRadius: 24,
	},
});
