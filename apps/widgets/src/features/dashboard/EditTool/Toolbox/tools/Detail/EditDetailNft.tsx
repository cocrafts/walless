import type { FC } from 'react';
import { Image } from 'react-native';
import { Networks } from '@walless/core';
import { View } from '@walless/gui';
import { getTezosMetadata } from '@walless/network';
import { DetailTool } from 'features/dashboard/EditTool/internal';
import { appState, editToolActions } from 'state/tool';
import { resources } from 'utils/config';
import { connection } from 'utils/connection';
import { getSolanaNftCollection } from 'utils/solana';
import { useSnapshot } from 'valtio';

import InputAddress from '../components/InputAddress';
import ItemTag from '../components/ItemTag';
import ToolDescription from '../components/ToolDescription';

const EditDetailNft: FC = () => {
	const { tools } = useSnapshot(appState);
	const { collectibles, networks } = tools.detail;
	const collectiblesAddress = Object.keys(collectibles);

	const onTarget = () => editToolActions.setTarget(DetailTool.collectibles);
	const onAddCollectible = async (address: string, tokenId?: number) => {
		if (networks.length == 0) return;

		if (networks[0] == Networks.tezos) {
			const tezosNftMetadata = await getTezosMetadata(address, tokenId);
			if (tezosNftMetadata) {
				editToolActions.setDetailCollectible(tezosNftMetadata);
			}
		} else if (networks[0] === Networks.solana) {
			const collectibleMetadata = await getSolanaNftCollection(
				connection,
				address,
			);
			if (collectibleMetadata) {
				editToolActions.setDetailCollectible(collectibleMetadata);
			}
		}
	};

	const handleRemoveCollectible = (id: string) => {
		editToolActions.deleteDetailCollectible(id);
	};

	return (
		<View onTouchStart={onTarget} onTouchEnd={editToolActions.unsetTarget}>
			<ToolDescription
				name={'NFT Collectibles'}
				description="Enter your NFT collectible address. If your project have more than 1 collectible, choose “Add more” to add."
			/>

			<InputAddress
				onSubmit={onAddCollectible}
				withOptional={networks[0] === Networks.tezos}
			/>

			<View horizontal>
				{collectiblesAddress.map((address) => {
					const collectible = collectibles[address];
					const Prefix: FC = () => (
						<Image
							style={{
								width: 20,
								height: 20,
								borderRadius: 10,
							}}
							source={
								collectible.imageUri
									? {
											uri: collectible.imageUri,
									  }
									: resources.walless.icon
							}
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
			</View>
		</View>
	);
};

export default EditDetailNft;
