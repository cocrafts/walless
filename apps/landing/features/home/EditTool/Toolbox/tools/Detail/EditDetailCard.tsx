import { type FC, useState } from 'react';
import { Networks } from '@walless/core';
import { Stack } from '@walless/ui';
import { DetailTool } from 'features/home/EditTool/internal';
import { editToolActions } from 'state/app';

import MultiOptionsDropdown, {
	type DropdownOptionProps,
} from '../components/MultiOptionsDropdown';
import ToolDescription from '../components/ToolDescription';

const options: DropdownOptionProps[] = [
	{
		id: Networks.solana,
		icon: '/img/preview/solana-logo.png',
		label: 'Solana',
	},
	{
		id: Networks.sui,
		icon: '/img/preview/sui-logo.png',
		label: 'Sui',
	},
];

const EditDetailCard: FC = () => {
	const onTarget = () => editToolActions.setTarget(DetailTool.networks);
	const [activeOptions, setActiveOptions] = useState<DropdownOptionProps[]>([]);

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

			<MultiOptionsDropdown
				options={options}
				activeOptions={activeOptions}
				setActiveOptions={setActiveOptions}
			/>
		</Stack>
	);
};

export default EditDetailCard;
