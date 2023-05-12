import { type FC } from 'react';
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
	const { tokens } = tools.detail;
	const tokensAddress = Object.keys(tokens);

	const onTarget = () => editToolActions.setTarget(DetailTool.token);
	const handleAddToken = async (value: string) => {
		const tokenMetadata = await getLazySolanaMetatadata(connection, value);
		if (tokenMetadata) {
			editToolActions.setDetailToken(tokenMetadata);
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
			<InputAddress onSubmit={handleAddToken} />
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
