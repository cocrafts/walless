import { FC } from 'react';
import { Text, TouchableOpacity } from '@walless/ui';

import { FeatureButtonProps } from '.';

const FeatureButton: FC<FeatureButtonProps> = ({ icon, title, onPress }) => {
	return (
		<TouchableOpacity
			className="w-1/4 h-[54px] px-3 py-2 flex gap-[2px] justify-center items-center hover:cursor-pointer"
			onPress={onPress}
		>
			{icon}
			<Text className="text-xs text-[#000000CC]">{title}</Text>
		</TouchableOpacity>
	);
};

export default FeatureButton;
