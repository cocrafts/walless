import { FC } from 'react';
import { TextInput, View } from '@walless/ui';

interface InputProps {
	title: string;
	className?: string;
	rightNode?: React.ReactNode;
}

const Input: FC<InputProps> = ({ title, className, rightNode = <View /> }) => {
	return (
		<View className={`w-full ${className}`}>
			<View className="h-12 bg-[#1B415A] rounded-lg flex flex-row justify-between items-center px-5 gap-3">
				<TextInput
					placeholder={title}
					className="text-[#99B0BF] text-sm grow"
				/>
				{rightNode}
			</View>
		</View>
	);
};

export default Input;
