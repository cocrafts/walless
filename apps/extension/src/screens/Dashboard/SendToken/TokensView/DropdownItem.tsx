import { FC } from 'react';
import { Image, Text } from '@walless/ui';

import { DropdownItemProps } from '.';

const DropdownItem: FC<DropdownItemProps> = ({ item }) => {
	return (
		<>
			<Image source={{ uri: item.icon }} className="w-6 h-6 rounded-full" />
			<Text className="text-sm">{item.name}</Text>
		</>
	);
};

export default DropdownItem;
