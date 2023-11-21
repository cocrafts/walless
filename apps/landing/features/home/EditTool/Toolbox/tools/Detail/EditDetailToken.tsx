import type { FC } from 'react';
import { Networks } from '@walless/core';
import { getTezosMetadata } from '@walless/network';
import { Image, Stack } from '@walless/ui';
import { DetailTool } from 'features/home/EditTool/internal';
import { appState, editToolActions } from 'state/app';
import { resources } from 'utils/config';
import { connection } from 'utils/connection';
import { getLazySolanaMetatadata } from 'utils/solana';
import { useSnapshot } from 'valtio';

import InputAddress from '../components/InputAddress';
import ItemTag from '../components/ItemTag';
import ToolDescription from '../components/ToolDescription';

const EditDetailToken: FC = () => {
	const { tools } = useSnapshot(appState);
	const { tokens, networks } = tools.detail;
	const tokensAddress = Object.keys(tokens);

	const onTarget = () => editToolActions.setTarget(DetailTool.token);

	const handleAddToken = async (address: string, tokenId?: number) => {
		if (networks[0] == Networks.tezos) {
			const tezosTokenMetadata = await getTezosMetadata(address, tokenId);
			if (tezosTokenMetadata) {
				editToolActions.setDetailToken(tezosTokenMetadata);
			}
		} else if (networks[0] === Networks.solana) {
			const solanaTokenMetadata = await getLazySolanaMetatadata(
				connection,
				address,
			);

			if (solanaTokenMetadata) {
				editToolActions.setDetailToken(solanaTokenMetadata);
			}
		}
	};

	const handleRemoveToken = (id: string) => {
		editToolActions.deleteDetailToken(id);
	};

	return (
		<Stack
			gap={10}
			onHoverIn={onTarget}
			onHoverOut={editToolActions.unsetTarget}
		>
			<ToolDescription
				name={'Token'}
				description="Enter your token address. If your project have more than 1 token, choose “Add more” to add."
			/>
			<InputAddress
				onSubmit={handleAddToken}
				withOptional={networks[0] === Networks.tezos}
			/>
			<Stack horizontal flexWrap="wrap" gap={10}>
				{tokensAddress.map((address) => {
					const token = tokens[address];
					const Prefix: FC = () => (
						<Image
							width={20}
							height={20}
							borderRadius={10}
							src={token.imageUri || resources.walless.icon}
						/>
					);

					return (
						<ItemTag
							prefix={<Prefix />}
							key={address}
							id={address}
							label={token.symbol || token._id}
							onRemove={handleRemoveToken}
						/>
					);
				})}
			</Stack>
		</Stack>
	);
};

export default EditDetailToken;
