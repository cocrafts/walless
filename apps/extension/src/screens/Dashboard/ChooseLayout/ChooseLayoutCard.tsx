import { Image } from 'react-native';
import { Text, TextBlack, View } from '@walless/ui';

interface Props {
	name: string;
	description: string;
	love?: number;
	activeUsers?: number;
}

const ChooseLayoutCard = (props: Props) => {
	return (
		<View className="bg-[#f4f4f4] w-full rounded-b">
			<View className="h-16 bg-light-gray rounded-t">
				<Image source={require('./card-image.png')} />
				<View className="absolute bottom-0 left-4 flex flex-row gap-2 items-center">
					<View className="bg-color-2 w-7 h-7 rounded-sm border-gray border"></View>
					<Text className="text-xs font-bold">{props.name}</Text>
				</View>

				<View className="h-7 absolute bottom-0 right-4 flex flex-row gap-2 items-center">
					{props.love && props.love > 0 && (
						<Text className="text-xs">💙 ${props.love}</Text>
					)}
					{props.activeUsers && props.activeUsers > 0 && (
						<Text className="text-xs">👥 {props.activeUsers}</Text>
					)}
				</View>
			</View>

			<View className="px-4 py-2">
				<TextBlack className="text-xs">{props.description}</TextBlack>
			</View>
		</View>
	);
};

export default ChooseLayoutCard;
