import { FC, useState } from 'react';
import { ChevronDownIcon, Text, TouchableOpacity, View } from '@walless/ui';

import DropdownItem from './DropdownItem';
import DropdownItemWrapper from './DropdownItemWrapper';
import { DropdownItemProps } from '.';

interface DropdownProps {
	className?: string;
	children?: React.ReactNode;
	leftNode: React.ReactNode;
	rightNode?: React.ReactNode;
	data: DropdownItemProps[];
	activeItem: DropdownItemProps | null;
	onSelect: (item: DropdownItemProps) => void;
}

const Dropdown: FC<DropdownProps> = ({
	leftNode,
	className,
	rightNode = <ChevronDownIcon color="#99B0BF" size={16} />,
	data,
	activeItem,
	onSelect,
}) => {
	return (
		<View className={`w-full ${className} group`}>
			<TouchableOpacity
				className="h-12 bg-[#1B415A] rounded-lg flex flex-row justify-between items-center px-5"
				activeOpacity={1}
			>
				<Text className="text-[#99B0BF] text-sm">{leftNode}</Text>
				{rightNode}
			</TouchableOpacity>

			<View className="bg-[#1B415A] rounded-lg w-full absolute z-50 top-12 left-0 invisible group-hover:visible">
				{data.map((item) => (
					<DropdownItemWrapper
						key={item.id}
						active={activeItem?.id === item.id}
						onPress={() => onSelect(item)}
					>
						<DropdownItem {...item} />
					</DropdownItemWrapper>
				))}
			</View>
		</View>
	);
};

export default Dropdown;
