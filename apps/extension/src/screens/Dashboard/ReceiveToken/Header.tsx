import { FC } from 'react';
import {
	ArrowBottomRightIcon,
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
				<ArrowBottomRightIcon size={16} color="#29A4D6" />
				<Text className="text-xl">
					{title.charAt(0).toUpperCase() + title.slice(1)}
				</Text>
			</View>

			<TouchableOpacity onPress={handleCloseModal}>
				<TimesIcon size={24} color="white" />
			</TouchableOpacity>
		</View>
	);
};

export default Header;
