import { FC, useState } from 'react';
import { ChevronDownIcon, Text, TouchableOpacity, View } from '@walless/ui';

interface DropdownProps {
	className?: string;
	children?: React.ReactNode;
	leftNode: React.ReactNode;
	rightNode?: React.ReactNode;
}

const Dropdown: FC<DropdownProps> = ({
	leftNode,
	className,
	children,
	rightNode = <ChevronDownIcon color="#99B0BF" size={16} />,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<View className={`w-full ${className}`}>
			<TouchableOpacity
				className="h-12 bg-[#1B415A] rounded-lg flex flex-row justify-between items-center px-5 z-10"
				activeOpacity={1}
				onPress={() => setIsOpen((prev) => !prev)}
			>
				<Text className="text-[#99B0BF] text-sm">{leftNode}</Text>
				{rightNode}
			</TouchableOpacity>

			<View
				className={`bg-[#1B415A] -mt-4 pt-6 pb-2 px-2 rounded-lg transition duration-300 flex ${
					isOpen ? 'block' : 'hidden'
				}`}
			>
				{children}
			</View>
		</View>
	);
};

export default Dropdown;
