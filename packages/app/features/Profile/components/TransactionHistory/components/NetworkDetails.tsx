import type { FC } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { View } from '@walless/gui';

interface Props {
	networkInfo: {
		name: string;
		icon: string;
	};
}

const NetworkDetails: FC<Props> = ({ networkInfo }) => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: networkInfo?.icon }} style={styles.networkIcon} />
			<Text style={styles.infoText}>{networkInfo?.name}</Text>
		</View>
	);
};

export default NetworkDetails;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 4,
	},
	infoText: {
		color: '#566674',
	},
	networkIcon: {
		width: 16,
		height: 16,
		borderRadius: 16,
	},
});
