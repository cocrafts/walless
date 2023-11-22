import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Hoverable, Text } from '@walless/gui';
import type { CollectibleDocument, CollectionDocument } from '@walless/store';

interface Props {
	item: CollectionDocument | CollectibleDocument;
	collectibleCount?: number;
	onPress: () => void;
}

export const CollectionItem: FC<Props> = ({
	item,
	collectibleCount,
	onPress,
}) => {
	const isCollection = item.type === 'Collection';

	return (
		<Hoverable style={styles.container} onPress={onPress}>
			<Image style={styles.image} source={{ uri: item.metadata?.imageUri }} />
			<Text style={styles.text}>
				{item.metadata?.name}
				{isCollection && `(${collectibleCount})`}
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
		fontWeight: '600',
		color: '#FFFFFF',
		marginTop: 14,
	},
});
