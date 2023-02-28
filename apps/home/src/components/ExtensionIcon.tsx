import { FC } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Image, Text, TouchableOpacity, View } from '@walless/ui';

interface Props {
	iconSrc: ImageSourcePropType;
	title?: string;
	onPress?: () => void;
	titleClass?: string;
}

export const ProductIcon: FC<Props> = ({
	iconSrc,
	title = 'Title',
	onPress,
}) => {
	return (
		<View className="px-8 hover:scale-95 cursor-pointer transform-gpu ease-in-out duration-300">
			<TouchableOpacity onPress={onPress}>
				<Image className="w-20 h-20" source={iconSrc} />
				<Text className="font-extralight text-center bg-white/10 px-3 py-2 rounded-full mt-5">
					{title}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ProductIcon;
