import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { AssetMetadata, Networks } from '@walless/core';
import { Select, View } from '@walless/gui';
import type { CollectibleDocument, CollectionDocument } from '@walless/store';
import { NavButton } from 'components/NavButton';
import { useNfts } from 'utils/hooks';
import { useSnapshot } from 'valtio';

import { txActions, txContext } from '../context';

import RecipientInput from './RecipientInput';
import TransactionFee from './TransactionFee';

interface Props {
	onContinue: () => void;
}

export const CollectiblesTab: FC<Props> = ({ onContinue }) => {
	const { collection, collectible, network } = useSnapshot(txContext).tx;
	const { collectibles, collections } = useNfts(network);

	const getRequiredFieldsForSelectToken = (item: {
		metadata?: AssetMetadata;
	}) => {
		return {
			id: item.metadata?.name as string,
			name: item.metadata?.name as string,
			icon: { uri: item.metadata?.imageUri as string },
		};
	};

	const handleSelectCollectible = (collectible: CollectibleDocument) => {
		const collection = collections.find(
			(ele) => ele._id === collectible.collectionId,
		);
		txActions.update({ collectible, collection });
	};

	const filteredCollectibles = collection
		? collectibles.filter((e) => e.collectionId === collection._id)
		: collectibles;

	return (
		<View style={styles.container}>
			<Select
				title="Select collection"
				notFoundText="Not found collections"
				items={collections}
				selected={collection as CollectionDocument}
				onSelect={(collection) => txActions.update({ collection })}
				getRequiredFields={getRequiredFieldsForSelectToken}
			/>

			<Select
				title="Select NFT"
				notFoundText="Not found NFTs"
				items={filteredCollectibles}
				selected={collectible as CollectibleDocument}
				onSelect={handleSelectCollectible}
				getRequiredFields={getRequiredFieldsForSelectToken}
				itemStyle={styles.selectNftItem}
				itemIconStyle={styles.selectNftIcon}
				selectedItemStyle={styles.selectedNftItem}
				selectedItemIconStyle={styles.selectedNftIcon}
			/>

			<RecipientInput />

			<TransactionFee network={collectible?.network as Networks} />

			<NavButton title="Continue" onPress={onContinue} />
		</View>
	);
};

export default CollectiblesTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		rowGap: 16,
	},
	totalLine: {
		height: 1,
		backgroundColor: '#566674',
		opacity: 0.2,
	},
	selectNftIcon: {
		height: 53,
		width: 53,
	},
	selectNftItem: {
		paddingVertical: 8,
	},
	selectedNftIcon: {
		height: 32,
		width: 32,
	},
	selectedNftItem: {
		paddingVertical: 9,
	},
});
