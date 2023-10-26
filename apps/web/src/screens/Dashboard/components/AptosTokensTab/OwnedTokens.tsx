import { StyleSheet } from 'react-native';
import { aptosState } from '@walless/engine';
import { View } from '@walless/gui';

import type { AptosCollection } from './Collection';
import Collection from './Collection';

const OwnedTokens = () => {
	const collections: AptosCollection[] = [];
	aptosState.ownedTokens.forEach((token) => {
		const collection = collections.find(
			(item) => item.id === token.collectionId,
		);
		if (collection) {
			collection.itemCount += 1;
		} else {
			collections.push({
				id: token.collectionId,
				name: token.collectionName,
				uri: token.uri,
				itemCount: 1,
			});
		}
	});
	collections.sort((a, b) => b.itemCount - a.itemCount);

	const handleSelectCollection = (id: string) => {
		console.log('handleSelectCollection', id);
	};

	return (
		<View style={styles.container}>
			{collections.map((collection) => (
				<Collection
					key={collection.id}
					item={collection}
					onPress={handleSelectCollection}
				/>
			))}
		</View>
	);
};

export default OwnedTokens;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		rowGap: 10,
		paddingBottom: 60,
	},
});