import { type FC, useState } from 'react';
import { Check } from '@walless/icons';
import { Button, Stack } from '@walless/ui';

import { type DropdownItemProps } from '../../internal';

import IconText from './IconText';

const DropdownItem: FC<DropdownItemProps> = ({
	name,
	icon,
	onPress,
	isSelected,
}) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<Button
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			backgroundColor={isActive ? '#141B21' : 'transparent'}
			width={320}
			height={40}
			borderRadius={11}
			padding={0}
			paddingHorizontal={16}
			onHoverIn={() => setIsActive(true)}
			onHoverOut={() => setIsActive(false)}
			onPress={onPress}
		>
			<IconText icon={icon ?? ''} name={name} />

			{isSelected ? <Check size={12} color="#566674" /> : <Stack />}
		</Button>
	);
};

export default DropdownItem;
