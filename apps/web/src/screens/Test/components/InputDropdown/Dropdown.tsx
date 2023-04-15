import { FC } from 'react';
import { ModalConfigs } from '@walless/app';
import { Stack } from '@walless/gui';

import { DropdownItemProps } from '../../internal';

import DropdownItem from './DropdownItem';

interface DropdownProps {
	items: DropdownItemProps[];
	setChosen: (item: unknown) => void;
	selectedItem: DropdownItemProps | null;
}

interface Props {
	config: ModalConfigs;
}

const Dropdown: FC<Props> = ({ config }) => {
	const { items, setChosen, selectedItem } = config.context as DropdownProps;

	console.log('Child', selectedItem);

	return (
		<Stack
			display="flex"
			alignItems="center"
			justifyContent="center"
			backgroundColor="#0E1419"
			borderRadius={15}
			paddingHorizontal={8}
			paddingVertical={8}
			zIndex={1}
		>
			{items.map((item) => (
				<DropdownItem
					key={item.id}
					id={item.id}
					name={item.name}
					icon={item.icon}
					onPress={() => setChosen(item)}
					isSelected={selectedItem?.id === item.id}
				/>
			))}
		</Stack>
	);
};

export default Dropdown;
