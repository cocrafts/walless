import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks, NftMetadata } from '@walless/core';
import { Select, View } from '@walless/gui';
import type {
	CollectionDocumentV2,
	NftDocumentV2,
	PouchDocument,
} from '@walless/store';
import CheckedInput from 'components/CheckedInput';
import { NavButton } from 'components/NavButton';
import { useNfts } from 'utils/hooks';
import { checkValidAddress } from 'utils/transaction';

import type { NftTransactionContext } from '../internal';
import { txActions, useTransactionContext } from '../internal';

import TransactionFee from './TransactionFee';

interface Props {
	onContinue: () => void;
}

export const NftTab: FC<Props> = ({ onContinue }) => {
	const { type, nft, collection, network, receiver } =
		useTransactionContext<NftTransactionContext>();
	const { nfts, collections } = useNfts(network);
	const [recipientError, setRecipientError] = useState('');

	const canContinue = recipientError === null && collection && nft;

	const getMetadata = (nft: PouchDocument<NftMetadata>) => {
		return {
			id: nft._id,
			name: nft.name,
			icon: { uri: nft.image },
		};
	};

	const checkRecipient = (receiver?: string, network?: Networks) => {
		if (receiver && network) {
			const result = checkValidAddress(receiver, network);
			setRecipientError(result || '');
		} else {
			setRecipientError('');
		}
	};

	const handleSelectNft = (nft: NftDocumentV2) => {
		const collection = collections.find((ele) => ele._id === nft.collectionId);
		txActions.update<NftTransactionContext>({ nft, collection });
		checkRecipient(receiver, network);
	};

	const handleSelectCollection = (collection: CollectionDocumentV2) => {
		txActions.update<NftTransactionContext>({ collection });
		checkRecipient(receiver, network);
	};

	const handleFocusOutRecipient = () => {
		checkRecipient(receiver, network);
	};

	const filteredNfts = useMemo(() => {
		return collection
			? nfts.filter((nft) => nft.collectionId === collection._id)
			: nfts;
	}, [collection]);

	useEffect(() => {
		if (type === 'nft' && nft) {
			txActions.update({ network: nft.network });
		}
	}, [type, nft]);

	return (
		<View style={styles.container}>
			<Select
				title="Select collection"
				notFoundText="Not found collections"
				items={collections}
				selected={collection}
				onSelect={handleSelectCollection}
				getRequiredFields={getMetadata}
			/>

			<Select
				title="Select NFT"
				notFoundText="Not found NFTs"
				items={filteredNfts}
				selected={nft}
				onSelect={handleSelectNft}
				getRequiredFields={getMetadata}
				itemStyle={styles.selectNftItem}
				itemIconStyle={styles.selectNftIcon}
				selectedItemStyle={styles.selectedNftItem}
				selectedItemIconStyle={styles.selectedNftIcon}
			/>

			<CheckedInput
				value={receiver}
				placeholder="Recipient account"
				errorText={recipientError}
				onChangeText={(receiver) => txActions.update({ receiver })}
				onBlur={handleFocusOutRecipient}
			/>

			<TransactionFee />

			<NavButton
				title="Continue"
				disabled={!canContinue}
				onPress={onContinue}
			/>
		</View>
	);
};

export default NftTab;

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
