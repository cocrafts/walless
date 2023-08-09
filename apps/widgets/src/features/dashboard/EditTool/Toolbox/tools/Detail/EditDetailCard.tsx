import type { FC } from 'react';
import { useState } from 'react';
import { Networks } from '@walless/core';
import { View } from '@walless/gui';
import { DetailTool } from 'features/dashboard/EditTool/internal';
import { editToolActions } from 'state/tool';

import MultiOptionsDropdown, {
	type DropdownOptionProps,
} from '../components/MultiOptionsDropdown';
import ToolDescription from '../components/ToolDescription';

const options: DropdownOptionProps[] = [
	{
		id: Networks.tezos,
		icon: '/img/network/tezos-icon-sm.png',
		label: 'Tezos',
	},
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
		<View onTouchStart={onTarget} onTouchEnd={editToolActions.unsetTarget}>
			<ToolDescription
				name="Supported Network(s)"
				description="What network(s) does your project support?"
			/>

			<MultiOptionsDropdown
				options={options}
				activeOptions={activeOptions}
				setActiveOptions={setActiveOptions}
			/>
		</View>
	);
};

export default EditDetailCard;
