import { FC, Fragment } from 'react';
import { Image, Text } from '@walless/ui';

import { DropdownItemProps } from '.';

const DropdownItem: FC<DropdownItemProps> = ({ icon, name }) => {
	return (
		<Fragment>
			<Image source={{ uri: icon }} className="w-6 h-6 rounded-full" />
			<Text className="text-sm text-white">{name}</Text>
		</Fragment>
	);
};

export default DropdownItem;
