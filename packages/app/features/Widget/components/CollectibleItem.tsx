import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';
import { Hoverable, Text } from '@walless/gui';
import type { CollectibleDocument, CollectionDocument } from '@walless/store';

interface Props {
	style?: StyleProp<ViewStyle>;
	item: CollectionDocument | CollectibleDocument;
	collectibleCount?: number;
	onPress: () => void;
}

export const CollectionItem: FC<Props> = ({
	style,
	item,
	collectibleCount,
	onPress,
}) => {
	const isCollection = item.type === 'Collection';

	return (
		<Hoverable style={[styles.container, style]} onPress={onPress}>
			<Image style={styles.image} source={{ uri: item.metadata?.imageUri }} />
			<View style={styles.titleWrapper}>
				<View style={styles.titleContainer}>
					<Text numberOfLines={1} style={styles.titleText}>
						{item.metadata?.name}
						{isCollection && `(${collectibleCount})`}
					</Text>
				</View>
				{isCollection && (
					<View style={styles.countContainer}>
						<Text style={styles.countText}>{collectibleCount}</Text>
					</View>
				)}
			</View>
		</Hoverable>
	);
};

export default CollectionItem;

const itemSize = 148;
const styles = StyleSheet.create({
	container: {
		width: itemSize,
		backgroundColor: '#131C24',
		borderRadius: 10,
	},
	image: {
		width: itemSize,
		height: itemSize,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		backgroundColor: '#202D38',
	},
	titleWrapper: {
		padding: 12,
		flexDirection: 'row',
	},
	titleContainer: {
		flex: 1,
	},
	titleText: {
		fontWeight: '300',
		color: '#FFFFFF',
	},
	countContainer: {
		marginLeft: 8,
	},
	countText: {
		color: '#566674',
	},
});
