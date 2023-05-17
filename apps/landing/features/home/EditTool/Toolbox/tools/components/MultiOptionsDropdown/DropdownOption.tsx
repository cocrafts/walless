import { type FC } from 'react';
import { Check } from '@walless/icons';
import { Button, Image, Stack, Text } from '@walless/ui';

import { type DropdownOptionProps } from '.';

interface Props {
	option: DropdownOptionProps;
	active: boolean;
	toggleOption: (option: DropdownOptionProps) => void;
}

const DropdownOption: FC<Props> = ({ option, active, toggleOption }) => {
	return (
		<Button
			backgroundColor="transparent"
			borderRadius={8}
			paddingHorizontal={8}
			paddingVertical={12}
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			hoverStyle={{ backgroundColor: '#2C3741' }}
			onPress={() => toggleOption(option)}
		>
			<Stack flexDirection="row">
				<Image src={option.icon} width={20} height={20} borderRadius={10} />
				<Text paddingLeft={5}>{option.label}</Text>
			</Stack>

			<Stack>{active && <Check color="#566674" size={16} />}</Stack>
		</Button>
	);
};

export default DropdownOption;
