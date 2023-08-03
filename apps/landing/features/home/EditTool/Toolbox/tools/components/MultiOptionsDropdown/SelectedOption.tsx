import type { FC } from 'react';
import { Times } from '@walless/icons';
import { Button, Image, Stack, Text } from '@walless/ui';

import type { DropdownOptionProps } from '.';

interface Props {
	option: DropdownOptionProps;
	toggleOption: (option: DropdownOptionProps) => void;
}

const SelectedOption: FC<Props> = ({ option, toggleOption }) => {
	return (
		<Stack
			backgroundColor="#2C3741"
			borderRadius={8}
			flexDirection="row"
			alignItems="center"
			paddingLeft={8}
			paddingVertical={8}
		>
			<Image src={option.icon} width={18} height={18} borderRadius={1000} />

			<Text paddingLeft={5} flex={1} textOverflow="ellipsis">
				{option.label}
			</Text>

			<Button
				backgroundColor="transparent"
				padding={4}
				onPress={() => toggleOption(option)}
			>
				<Times size={14} color="#566674" />
			</Button>
		</Stack>
	);
};

export default SelectedOption;
