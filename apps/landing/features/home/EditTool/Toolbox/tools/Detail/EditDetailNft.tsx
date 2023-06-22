import { type FC, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Networks } from '@walless/core';
import { getTezosMetadata } from '@walless/network';
import { Image, Stack } from '@walless/ui';
import { DetailTool } from 'features/home/EditTool/internal';
import { parseInt } from 'lodash';
import { appState, editToolActions } from 'state/app';
import { resources } from 'utils/config';
import { connection } from 'utils/connection';
import { getSolanaNftCollection } from 'utils/solana';
import { useSnapshot } from 'valtio';

import InputAddress from '../components/InputAddress';
import ItemTag from '../components/ItemTag';
import ToolDescription from '../components/ToolDescription';

const EditDetailNft: FC = () => {
	const [tokenId, setTokenId] = useState<number>();
	const { tools } = useSnapshot(appState);
	const { collectibles, networks } = tools.detail;
	const collectiblesAddress = Object.keys(collectibles);

	const onTarget = () => editToolActions.setTarget(DetailTool.collectibles);
	const onAddCollectible = async (value: string) => {
		if (networks.length == 0) return;

		if (networks[0] == Networks.tezos) {
			const tezosNftMetadata = await getTezosMetadata(value, tokenId);
			if (tezosNftMetadata) {
				editToolActions.setDetailCollectibe(tezosNftMetadata);
			}
		} else if (networks[0] === Networks.solana) {
			const collectibeMetadata = await getSolanaNftCollection(
				connection,
				value,
			);
			if (collectibeMetadata) {
				editToolActions.setDetailCollectibe(collectibeMetadata);
			}
		}
	};

	const handleRemoveCollectible = (id: string) => {
		editToolActions.deleteDetailCollectible(id);
	};

	return (
		<Stack
			gap={10}
			onHoverIn={onTarget}
			onHoverOut={editToolActions.unsetTarget}
		>
			<ToolDescription
				name={'NFT Collectibles'}
				description="Enter your NFT collectible address. If your project have more than 1 collectible, choose “Add more” to add."
			/>

			<InputAddress onSubmit={onAddCollectible} />
			{networks.length >= 0 && networks[0] === Networks.tezos && (
				<TextInput
					onChangeText={(text) => setTokenId(parseInt(text))}
					style={styles.tokenIdInputContainer}
					placeholder={'Enter token id (Optional)'}
					placeholderTextColor={'#566674'}
				/>
			)}

			<Stack horizontal flexWrap="wrap" gap={10}>
				{collectiblesAddress.map((address) => {
					const collectible = collectibles[address];
					const Prefix: FC = () => (
						<Image
							width={20}
							height={20}
							borderRadius={10}
							src={collectible.imageUri || resources.walless.icon}
						/>
					);

					return (
						<ItemTag
							prefix={<Prefix />}
							key={address}
							id={address}
							label={collectible.symbol || collectible._id}
							onRemove={handleRemoveCollectible}
						/>
					);
				})}
			</Stack>
		</Stack>
	);
};

export default EditDetailNft;

const styles = StyleSheet.create({
	tokenIdInputContainer: {
		backgroundColor: '#19232C',
		fontFamily: 'Rubik',
		borderRadius: 8,
		paddingHorizontal: 14,
		paddingVertical: 14,
	},
});
