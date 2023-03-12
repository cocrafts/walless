import React from 'react';
import { TouchableOpacity, View } from '@walless/ui';

interface Props {
	isActive: boolean;
	index: number;
	onScrollPress: (index: number) => void;
}

export const Indicator: React.FC<Props> = ({
	isActive,
	index,
	onScrollPress,
}) => {
	return (
		<TouchableOpacity
			className="flex-1 m-1 max-w-[45px] h-1 rounded-lg overflow-hidden"
			onPress={() => onScrollPress(index)}
		>
			<View
				className={`h-full bg-white ${isActive ? 'opacity-100' : 'opacity-30'}`}
			/>
		</TouchableOpacity>
	);
};

export default Indicator;
