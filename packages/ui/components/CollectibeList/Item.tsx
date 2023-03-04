import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CollectibleMeta } from '../../utils/types';

interface Props {
	index: number;
	item: CollectibleMeta;
}

export const CollectibleItem: FC<Props> = () => {
	return (
		<View style={styles.container}>
			<Text>CollectibleItem</Text>
		</View>
	);
};

export default CollectibleItem;

const styles = StyleSheet.create({
	container: {},
});
