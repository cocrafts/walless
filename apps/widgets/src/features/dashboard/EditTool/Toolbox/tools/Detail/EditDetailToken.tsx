import type { FC } from 'react';
import { Image } from 'react-native';
import { Networks } from '@walless/core';
import { View } from '@walless/gui';
import { getTezosMetadata } from '@walless/network';
import { DetailTool } from 'features/dashboard/EditTool/internal';
import { appState, editToolActions } from 'state/tool';
import { resources } from 'utils/config';
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
			// Handle this
		}
	};

	const handleRemoveToken = (id: string) => {
		editToolActions.deleteDetailToken(id);
	};

	return (
		<View onTouchStart={onTarget} onTouchEnd={editToolActions.unsetTarget}>
			<ToolDescription
				name={'Token'}
				description="Enter your token address. If your project have more than 1 token, choose “Add more” to add."
			/>
			<InputAddress
				onSubmit={handleAddToken}
				withOptional={networks[0] === Networks.tezos}
			/>
			<View horizontal>
				{tokensAddress.map((address) => {
					const token = tokens[address];
					const Prefix: FC = () => (
						<Image
							style={{
								width: 20,
								height: 20,
								borderRadius: 10,
							}}
							source={
								token.imageUri
									? { uri: token.imageUri }
									: resources.walless.icon
							}
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
			</View>
		</View>
	);
};

export default EditDetailToken;
