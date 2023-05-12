import { type FC } from 'react';
import { Networks } from '@walless/core';
import { Image, Stack } from '@walless/ui';
import { DetailTool } from 'features/home/EditTool/internal';
import { editToolActions } from 'state/app';
import { resources } from 'utils/config';

import ItemTag from '../components/ItemTag';
import ToolDescription from '../components/ToolDescription';

const EditDetailCard: FC = () => {
	const onTarget = () => editToolActions.setTarget(DetailTool.networks);

	return (
		<Stack
			gap={10}
			onHoverIn={onTarget}
			onHoverOut={editToolActions.unsetTarget}
		>
			<ToolDescription
				name="Supported Network(s)"
				description="What network(s) does your project support?"
			/>
			<Stack
				backgroundColor="#19232C"
				padding={5}
				borderRadius={8}
				flexDirection="row"
				gap={4}
			>
				<ItemTag
					prefix={
						<Image
							src={resources.home.detail.iconSrc}
							width={20}
							height={20}
							borderRadius={10}
						/>
					}
					id={Networks.solana}
					label={Networks.solana}
					onRemove={() => console.log('Not supported yet')}
				/>
			</Stack>
		</Stack>
	);
};

export default EditDetailCard;
