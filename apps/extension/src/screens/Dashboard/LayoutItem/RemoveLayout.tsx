import { FC } from 'react';
import { ImageSourcePropType } from 'react-native';
import {
	IconButton,
	Text,
	TimesIcon,
	TouchableOpacity,
	View,
} from '@walless/ui';
import { layoutActions } from 'utils/state/layout';

interface Props {
	className?: string;
	icon: ImageSourcePropType;
	name: string;
	id: string;
}

const RemoveLayout: FC<Props> = ({ className, icon, name, id }) => {
	return (
		<View
			className={`w-[200px] bg-[#00080E] rounded-lg px-3 py-2 flex gap-3 ${className}`}
		>
			<View className="absolute w-3 h-3 bg-[#00080E] rounded-sm rotate-45 top-3 -left-[2px]" />

			<View className="flex flex-row gap-3 items-center">
				<IconButton
					size={36}
					source={icon}
					className="rounded-lg overflow-hidden"
				/>
				<Text>{name}</Text>
			</View>

			<View className="w-full border border-[#203C4E] rounded-lg" />

			<TouchableOpacity
				className="w-full flex flex-row justify-between items-center"
				onPress={() => layoutActions.removeLayout(id)}
			>
				<Text className="text-[10px] [color:#587A90]">Remove this layout</Text>
				<View className="flex flex-row justify-center items-center">
					<View className="w-[6px] h-[6px] rounded-[1px] translate-x-1/2 bg-[#203C4E] rotate-45" />
					<View className="w-[12px] h-[10px] rounded-sm bg-[#203C4E] flex justify-center items-center">
						<TimesIcon size={16} color="#4E758E" />
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default RemoveLayout;
