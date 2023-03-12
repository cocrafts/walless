import { FC } from 'react';
import { ChevronDownIcon, Text, TouchableOpacity, View } from '@walless/ui';

import DropdownItem from './DropdownItem';
import DropdownItemWrapper from './DropdownItemWrapper';
import { DropdownItemProps } from '.';

interface DropdownProps {
	className?: string;
	children?: React.ReactNode;
	leftNode: React.ReactNode;
	data: DropdownItemProps[];
	activeItem: DropdownItemProps | null;
	onSelect: (item: DropdownItemProps) => void;
}

const Dropdown: FC<DropdownProps> = ({
	leftNode,
	className,
	data,
	activeItem,
	onSelect,
}) => {
	return (
		<View
			className={`z-10 w-full ${className} hover:drop-shadow-[0_2px_4px_rgba(255,245,245,0.25)] group`}
		>
			<TouchableOpacity
				className="h-12 bg-[#1B415A] rounded-lg flex flex-row justify-between items-center px-5"
				activeOpacity={1}
			>
				<Text className="[color:#99B0BF] text-sm">{leftNode}</Text>
				<ChevronDownIcon
					className="transition duration-300 group-hover:rotate-180"
					color="#99B0BF"
					size={16}
				/>
			</TouchableOpacity>

			<View className="bg-[#1B415A] w-full pt-2 -mt-2 rounded-b-lg absolute z-50 top-12 left-0 invisible group-hover:visible">
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
