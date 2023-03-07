import { FC, useState } from 'react';
import { ChevronDownIcon, Text, TouchableOpacity, View } from '@walless/ui';

interface DropdownProps {
	title: string;
	className?: string;
	children?: React.ReactNode;
	rightNode?: React.ReactNode;
}

const Dropdown: FC<DropdownProps> = ({
	title,
	className,
	children,
	rightNode = <ChevronDownIcon color="#99B0BF" size={16} />,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<View className={`w-full ${className}`}>
			<TouchableOpacity
				className="h-12 bg-[#1B415A] rounded-lg flex flex-row justify-between items-center px-5"
				onPress={() => setIsOpen((prev) => !prev)}
			>
				<Text className="text-[#99B0BF] text-sm">{title}</Text>
				{rightNode}
			</TouchableOpacity>

			<View
				className={`border border-[#1B415A] border-t-0 -mt-4 pt-6 pb-2 px-2 rounded-lg transition duration-300 ${
					isOpen ? 'block' : 'hidden'
				}`}
			>
				{children}
			</View>
		</View>
	);
};

export default Dropdown;
