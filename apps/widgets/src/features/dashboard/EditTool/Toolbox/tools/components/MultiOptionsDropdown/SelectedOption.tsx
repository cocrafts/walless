import type { FC } from 'react';
import { Image } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Times } from '@walless/icons';

import type { DropdownOptionProps } from '.';

interface Props {
	option: DropdownOptionProps;
	toggleOption: (option: DropdownOptionProps) => void;
}

const SelectedOption: FC<Props> = ({ option, toggleOption }) => {
	return (
		<View>
			<Image
				style={{
					width: 18,
					height: 18,
					borderRadius: 1000,
				}}
				source={{ uri: option.icon }}
			/>

			<Text>{option.label}</Text>

			<Button transparent onPress={() => toggleOption(option)}>
				<Times size={14} color="#566674" />
			</Button>
		</View>
	);
};

export default SelectedOption;
