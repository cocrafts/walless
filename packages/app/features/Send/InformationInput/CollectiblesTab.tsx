import { Select, View } from '@walless/gui';
import type { CollectibleDocument, CollectionDocument } from '@walless/store';
import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../state/transaction';
import { NavButton } from '../components';

import { Networks } from '@walless/core';
import { RecipientInput, TransactionFee } from './components';

interface Props {
	onContinue: () => void;
}

export const CollectiblesTab: FC<Props> = ({ onContinue }) => {
	const { nftCollections, nftCollectibles, network } =
		useSnapshot(injectedElements);
	const { nftCollection, nftCollectible } = useSnapshot(transactionContext);

	const getRequiredFieldsForSelectToken = (
		item: CollectibleDocument | CollectionDocument,
	) => {
		return {
			id: item.metadata?.name as string,
			name: item.metadata?.name as string,
			icon: item.metadata?.imageUri as string,
		};
	};

	const filteredCollectibles = (nftCollection
		? nftCollectibles.filter((e) => e.collectionId === nftCollection._id)
		: nftCollectibles) as never as CollectibleDocument[];

	return (
		<View style={styles.container}>
			<Select
				title="Select collection"
				notFoundText="Not found collections"
				items={nftCollections as CollectionDocument[]}
				selected={nftCollection as CollectionDocument}
				onSelect={transactionActions.setNftCollection}
				getRequiredFields={getRequiredFieldsForSelectToken}
			/>

			<Select
				title="Select NFT"
				notFoundText="Not found NFTs"
				items={filteredCollectibles as CollectibleDocument[]}
				selected={nftCollectible as CollectibleDocument}
				onSelect={transactionActions.setNftCollectible}
				getRequiredFields={getRequiredFieldsForSelectToken}
				itemStyle={styles.selectNftItem}
				itemIconStyle={styles.selectNftIcon}
				selectedItemStyle={styles.selectedNftItem}
				selectedItemIconStyle={styles.selectedNftIcon}
			/>

			<RecipientInput />

			<TransactionFee network={network ?? Networks.solana} />

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
