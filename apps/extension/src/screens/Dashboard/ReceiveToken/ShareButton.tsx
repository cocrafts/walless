import { FC } from 'react';
import { Text, TouchableOpacity } from '@walless/ui';

interface Props {
	className?: string;
	text: string;
	disable: boolean;
	onPress?: () => void;
}

const ShareButton: FC<Props> = ({ className, text, disable, onPress }) => {
	return (
		<TouchableOpacity
			className={`h-12 bg-gradient-to-r rounded-lg flex justify-center items-center ${
				disable
					? 'from-[#C1C1C133] to-[#71727233]'
					: 'from-[#1FA1D9] to-[#72BBC4]'
			} ${className}`}
			disabled={disable}
			onPress={onPress}
		>
			<Text
				className={`font-medium ${disable ? 'text-white' : 'text-[#587A90]'}`}
			>
				{text.charAt(0).toUpperCase() + text.slice(1)}
			</Text>
		</TouchableOpacity>
	);
};

export default ShareButton;
