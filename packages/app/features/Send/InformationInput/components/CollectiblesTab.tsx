import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Collectible, Collection } from '@walless/core';
import { Select, View } from '@walless/gui';
import type { CollectionDocument } from '@walless/store';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../../state/transaction';
import { NavButton } from '../../components';

import { NetworkFee } from './NetworkFee';
import { RecipientInput } from './RecipientInput';

interface Props {
	onContinue: () => void;
}

export const CollectiblesTab: FC<Props> = ({ onContinue }) => {
	const { nftCollections, nftCollectibles } = useSnapshot(injectedElements);
	const { nftCollection, nftCollectible } = useSnapshot(transactionContext);

	const getRequiredFieldsForSelectToken = (item: Collection | Collectible) => {
		return {
			id: item.metadata?.name as string,
			name: item.metadata?.name as string,
			icon: item.metadata?.imageUri as string,
		};
	};

	return (
		<View style={styles.container}>
			<Select
				title="Select collection"
				notFoundText="Not found collections"
				items={nftCollections as Collection[]}
				selected={nftCollection as Collection}
				getRequiredFields={getRequiredFieldsForSelectToken}
				onSelect={transactionActions.setNftCollection}
			/>

			<Select
				title="Select NFT"
				notFoundText="Not found NFTs"
				items={
					(nftCollection
						? nftCollectibles.filter(
								(ele) =>
									ele.collectionId ===
									(nftCollection as CollectionDocument)._id,
						  )
						: nftCollectibles) as Collectible[]
				}
				selected={nftCollectible as Collectible}
				getRequiredFields={getRequiredFieldsForSelectToken}
				onSelect={transactionActions.setNftCollectible}
			/>

			<RecipientInput />

			<NetworkFee />

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
});
