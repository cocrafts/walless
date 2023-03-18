import { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CollectibleRecord } from '@walless/storage';

interface Props {
	item: CollectibleRecord;
	onPress: (item: CollectibleRecord) => void;
}

export const RunnerNft: FC<Props> = ({ item, onPress }) => {
	const iconSrc = { uri: `/runner/${item.metadata?.imageUri}-icon.png` };

	return (
		<TouchableOpacity style={styles.container} onPress={() => onPress?.(item)}>
			<Image source={iconSrc} style={styles.nftIcon} />
			<Text style={styles.text}>{item.metadata?.name}</Text>
		</TouchableOpacity>
	);
};

export default RunnerNft;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#464646',
		margin: 8,
		padding: 18,
		borderRadius: 8,
		alignItems: 'center',
	},
	nftIcon: {
		width: 60,
		height: 60,
		marginBottom: 12,
	},
	text: {
		color: 'white',
		textAlign: 'center',
	},
});
