import { FC, useRef } from 'react';
import { TextInput as BareTextInput } from 'react-native';
import { Text, TextInput, TouchableOpacity, View } from '@walless/ui';

interface InputProps {
	title: string;
	className?: string;
	onTextChange: (text: string) => void;
	maxValue?: string;
}

interface InputRef extends BareTextInput {
	value: string;
}

const Input: FC<InputProps> = ({
	title,
	className,
	onTextChange,
	maxValue,
}) => {
	const inputRef = useRef<InputRef>(null);

	return (
		<View className={`w-full ${className}`}>
			<View className="h-12 bg-[#1B415A] rounded-lg flex flex-row justify-between items-center px-5 gap-3">
				<TextInput
					placeholder={title}
					className="placeholder:[color:#99B0BF] text-white text-sm grow"
					onChangeText={(text) => onTextChange(text)}
					ref={inputRef}
				/>
				{maxValue ? (
					<TouchableOpacity
						onPress={() => {
							if (inputRef.current) {
								inputRef.current.value = maxValue;
								onTextChange(maxValue);
							}
						}}
					>
						<Text className="bg-white/10 px-2 pb-[2px] pt-1 rounded h-fit text-[8px]">
							Max
						</Text>
					</TouchableOpacity>
				) : (
					<View />
				)}
			</View>
		</View>
	);
};

export default Input;
