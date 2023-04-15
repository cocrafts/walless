import { FC, useState } from 'react';
import { ModalConfigs } from '@walless/app';
import { Stack } from '@walless/gui';
import { ChevronDown } from '@walless/icons';

import { DropdownItemProps } from '../../internal';

import DropdownItem from './DropdownItem';

interface DropdownProps {
	items: DropdownItemProps[];
	setChosen: (item: DropdownItemProps) => void;
}

interface Props {
	config: ModalConfigs;
}

const Dropdown: FC<Props> = ({ config }) => {
	const { items, setChosen } = config.context as DropdownProps;
	const [isActive, setIsActive] = useState(false);
	const [selectedItem, setSelectedItem] = useState<DropdownItemProps | null>(
		null,
	);
	const handleSelectItem = (item: DropdownItemProps) => {
		setSelectedItem(item);
		if (setChosen) {
			setChosen(item);
		}
		setIsActive(false);
	};

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
					onPress={() => handleSelectItem(item)}
					isSelected={selectedItem?.id === item.id}
				/>
			))}
		</Stack>
	);
};

export default Dropdown;
