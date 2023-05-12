import { type FC } from 'react';
import { Image, Stack } from '@walless/ui';
import { DetailTool } from 'features/home/EditTool/internal';
import { appState, editToolActions } from 'state/app';
import { resources } from 'utils/config';
import { connection } from 'utils/connection';
import { getSolanaNftCollection } from 'utils/solana';
import { useSnapshot } from 'valtio';

import InputAddress from '../components/InputAddress';
import ItemTag from '../components/ItemTag';
import ToolDescription from '../components/ToolDescription';

const EditDetailNft: FC = () => {
	const { tools } = useSnapshot(appState);
	const { collectibles } = tools.detail;
	const collectiblesAddress = Object.keys(collectibles);

	const onTarget = () => editToolActions.setTarget(DetailTool.collectibles);
	const onAddCollectible = async (value: string) => {
		const collectibeMetadata = await getSolanaNftCollection(connection, value);
		if (collectibeMetadata) {
			editToolActions.setDetailCollectibe(collectibeMetadata);
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
