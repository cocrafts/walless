import { FC, useState } from 'react';
import { Image, Stack, Text } from '@walless/gui';
import { ChevronDown } from '@walless/icons';

import { DropdownItemProps, DropdownProps } from '../../internal';

import DropdownItem from './DropdownItem';

const Dropdown: FC<DropdownProps> = ({ name, items }) => {
	const [isActive, setIsActive] = useState(false);
	const [selectedItem, setSelectedItem] = useState<DropdownItemProps | null>(
		null,
	);
	const handleSelectItem = (item: DropdownItemProps) => {
		setSelectedItem(item);
		setIsActive(false);
	};

	return (
		<Stack
			onHoverIn={() => setIsActive(true)}
			onHoverOut={() => setIsActive(false)}
			display="flex"
			alignItems="center"
			gap={8}
		>
			<Stack
				display="flex"
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				backgroundColor="#0E141A"
				width={336}
				height={48}
				borderRadius={15}
				borderColor={isActive ? '#49596A' : 'transparent'}
				borderWidth={isActive ? 1 : 0}
				paddingHorizontal={16}
			>
				{selectedItem ? (
					<Stack
						display="flex"
						flexDirection="row"
						alignItems="center"
						justifyContent="center"
						gap={4}
					>
						<Image
							src={selectedItem.icon}
							width={16}
							height={16}
							borderRadius={8}
						/>
						<Text fontWeight="400" fontSize={14} color="#FFFFFF">
							{selectedItem.name}
						</Text>
					</Stack>
				) : (
					<Text fontWeight="400" fontSize={14} color="#566674">
						{name}
					</Text>
				)}

				<ChevronDown color="#566674" size={16} />
			</Stack>

			{isActive && (
				<Stack
					display="flex"
					alignItems="center"
					justifyContent="center"
					backgroundColor="#0E1419"
					borderRadius={15}
					paddingHorizontal={8}
					paddingVertical={8}
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
			)}
		</Stack>
	);
};

export default Dropdown;
