import { FC } from 'react';
import { Text, TouchableOpacity } from '@walless/ui';

interface Props {
	className?: string;
	isAbleToContinue: boolean;
	onPress?: () => void;
}

const ContinueButton: FC<Props> = ({
	className,
	isAbleToContinue,
	onPress,
}) => {
	return (
		<TouchableOpacity
			className={`h-12 mx-6 bg-gradient-to-r rounded-lg flex justify-center items-center ${
				isAbleToContinue
					? 'from-[#1FA1D9] to-[#72BBC4]'
					: 'from-[#C1C1C133] to-[#71727233]'
			} ${className}`}
			disabled={!isAbleToContinue}
			onPress={onPress}
		>
			<Text
				className={`font-medium ${
					isAbleToContinue ? 'text-white' : 'text-[#587A90]'
				}`}
			>
				Continue
			</Text>
		</TouchableOpacity>
	);
};

export default ContinueButton;
