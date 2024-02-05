import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { AssetMetadata, Networks } from '@walless/core';
import { Select, View } from '@walless/gui';
import type { CollectibleDocument, CollectionDocument } from '@walless/store';
import CheckedInput from 'components/CheckedInput';
import { NavButton } from 'components/NavButton';
import { useNfts } from 'utils/hooks';
import { checkValidAddress } from 'utils/transaction';
import { useSnapshot } from 'valtio';

import { txActions, txContext } from '../context';

import TransactionFee from './TransactionFee';

interface Props {
	onContinue: () => void;
}

export const CollectiblesTab: FC<Props> = ({ onContinue }) => {
	const { collection, collectible, network, receiver } =
		useSnapshot(txContext).tx;
	const { collectibles, collections } = useNfts(network);
	const [recipientInput, setRecipientInput] = useState({
		valid: false,
		message: '',
	});
	const canContinue = recipientInput.valid && collection && collectible;

	const getRequiredFieldsForSelectToken = (item: {
		metadata?: AssetMetadata;
	}) => {
		return {
			id: item.metadata?.name as string,
			name: item.metadata?.name as string,
			icon: { uri: item.metadata?.imageUri as string },
		};
	};

	const checkRecipient = (receiver?: string, network?: Networks) => {
		if (receiver && network) {
			const result = checkValidAddress(receiver, network);
			setRecipientInput(result);
		}
	};

	const handleSelectCollectible = (collectible: CollectibleDocument) => {
		const collection = collections.find(
			(ele) => ele._id === collectible.collectionId,
		);
		txActions.update({ collectible, collection });
		checkRecipient(receiver, collectible.network);
	};

	const handleSelectCollection = (collection: CollectionDocument) => {
		txActions.update({ collection });
		checkRecipient(receiver, collection.network);
	};

	const handleFocusOutRecipient = (value?: string) => {
		checkRecipient(
			value,
			network || collection?.network || collectible?.network,
		);
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
				onSelect={handleSelectCollection}
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

			<CheckedInput
				value={receiver}
				placeholder="Recipient account"
				errorText={recipientInput.message}
				onChangeText={(receiver) => txActions.update({ receiver })}
				onBlur={() => handleFocusOutRecipient(receiver)}
			/>

			<TransactionFee network={collectible?.network as Networks} />

			<NavButton
				title="Continue"
				disabled={!canContinue}
				onPress={onContinue}
			/>
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
