import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Hoverable, Text } from '@walless/gui';

export interface AptosCollection {
	id: string;
	name: string;
	uri: string;
	itemCount: number;
}

interface Props {
	item: AptosCollection;
	onPress?: (id: string) => void;
}

const Collection: FC<Props> = ({ item, onPress }) => {
	return (
		<Hoverable
			style={styles.container}
			onPress={onPress && (() => onPress(item.id))}
		>
			<Image style={styles.image} source={{ uri: item.uri }} />
			<Text style={styles.text}>
				{item.name} ({item.itemCount})
			</Text>
		</Hoverable>
	);
};

export default Collection;

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
