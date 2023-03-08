import { FC } from 'react';
import {
	ArrowTopRightIcon,
	Text,
	TimesIcon,
	TouchableOpacity,
	View,
} from '@walless/ui';

interface Props {
	className?: string;
	title: string;
	handleCloseModal: () => void;
}

const Header: FC<Props> = ({ className, title, handleCloseModal }) => {
	return (
		<View className={`w-full flex flex-row justify-between ${className}`}>
			<View className="flex flex-row justify-start gap-1">
				<ArrowTopRightIcon size={16} color="#29A4D6" />
				<Text className="text-xl">{title}</Text>
			</View>

			<TouchableOpacity onPress={handleCloseModal}>
				<TimesIcon size={24} color="white" />
			</TouchableOpacity>
		</View>
	);
};

export default Header;
