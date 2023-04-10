import { FC, useState } from 'react';
import { Image, Stack, Text } from '@walless/gui';
import { Check } from '@walless/icons';

import { DropdownItemProps } from '../../internal';

const DropdownItem: FC<DropdownItemProps> = ({
	name,
	icon,
	onPress,
	isSelected,
}) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<Stack
			display="flex"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			backgroundColor={isActive ? '#141B21' : 'transparent'}
			width={320}
			height={40}
			borderRadius={11}
			onHoverIn={() => setIsActive(true)}
			onHoverOut={() => setIsActive(false)}
			onPress={onPress}
			paddingHorizontal={16}
		>
			<Stack
				display="flex"
				flexDirection="row"
				justifyContent="center"
				alignItems="center"
				gap={4}
			>
				<Image src={icon} width={16} height={16} borderRadius={8} />
				<Text
					fontWeight="400"
					fontSize={14}
					color={isActive ? '#FFFFFF' : '#566674'}
				>
					{name}
				</Text>
			</Stack>

			{isSelected ? <Check size={12} color="#566674" /> : <Stack />}
		</Stack>
	);
};

export default DropdownItem;
