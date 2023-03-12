import { FC } from 'react';
import { TouchableOpacity } from '@walless/ui';

interface Props {
	className?: string;
	children?: React.ReactNode;
	active?: boolean;
	onPress?: () => void;
}

const DropdownItemWrapper: FC<Props> = ({
	className,
	children,
	active = false,
	onPress,
}) => {
	return (
		<TouchableOpacity
			className={`transition hover:bg-[#26506D] w-full h-12 flex flex-row gap-3 items-center px-5 rounded-md ${
				active && 'bg-[#26506D]'
			} ${className}`}
			activeOpacity={1}
			onPress={onPress}
		>
			{children}
		</TouchableOpacity>
	);
};

export default DropdownItemWrapper;
