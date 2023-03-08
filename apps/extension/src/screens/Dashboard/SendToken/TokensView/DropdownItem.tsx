import { FC } from 'react';
import { Image, Text } from '@walless/ui';

import { DropdownItemProps } from '.';

const DropdownItem: FC<DropdownItemProps> = ({ icon, name }) => {
	return (
		<>
			<Image source={{ uri: icon }} className="w-6 h-6 rounded-full" />
			<Text className="text-sm">{name}</Text>
		</>
	);
};

export default DropdownItem;
