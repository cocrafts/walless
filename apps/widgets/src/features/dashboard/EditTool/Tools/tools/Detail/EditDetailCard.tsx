import type { FC } from 'react';
import { useState } from 'react';
import { Networks } from '@walless/core';
import { Select } from '@walless/gui';
import { DetailTool } from 'features/dashboard/EditTool/internal';
import { editToolActions } from 'state/tool';

import { type DropdownOptionProps } from '../components/MultiOptionsDropdown';
import ToolBox from '../components/ToolBox';
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
	const [activeOption, setActiveOption] = useState<DropdownOptionProps>();

	return (
		<ToolBox onHover={onTarget}>
			<ToolDescription
				name="Supported Network(s)"
				description="What network(s) does your project support?"
			/>

			<Select
				selected={activeOption}
				items={options}
				onSelect={setActiveOption}
				title={'Select network'}
				getRequiredFields={function (item: DropdownOptionProps) {
					return {
						id: item.id,
						name: item.label,
						icon: item.icon,
					};
				}}
				selectedItemStyle={{ borderRadius: 8 }}
			/>
		</ToolBox>
	);
};

export default EditDetailCard;
