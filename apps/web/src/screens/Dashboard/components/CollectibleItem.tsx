import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import type { Collection } from '@walless/core';
import { Hoverable, Text } from '@walless/gui';

interface Props {
	item: Collection;
	collectibleCount: number;
	onPress: () => void;
}

export const CollectionItem: FC<Props> = ({
	item,
	collectibleCount,
	onPress,
}) => {
	return (
		<Hoverable style={styles.container} onPress={onPress}>
			<Image style={styles.image} source={{ uri: item.metadata?.imageUri }} />
			<Text style={styles.text}>
				{item.metadata?.name} ({collectibleCount})
			</Text>
		</Hoverable>
	);
};

export default CollectionItem;

const styles = StyleSheet.create({
	container: {
		width: 158,
		padding: 14,
		alignItems: 'center',
		backgroundColor: '#131C24',
		borderRadius: 10,
	},
	image: {
		width: 130,
		height: 130,
		borderRadius: 10,
		backgroundColor: '#0B1218',
	},
	text: {
		width: '100%',
		fontWeight: '600',
		color: '#FFFFFF',
		marginTop: 14,
	},
});
