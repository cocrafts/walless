import type { FC } from 'react';
import { Image } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { Check } from '@walless/icons';

import type { DropdownOptionProps } from '.';

interface Props {
	option: DropdownOptionProps;
	active: boolean;
	toggleOption: (option: DropdownOptionProps) => void;
}

const DropdownOption: FC<Props> = ({ option, active, toggleOption }) => {
	return (
		<Button onPress={() => toggleOption(option)}>
			<View horizontal>
				<Image
					style={{
						width: 20,
						height: 20,
						borderRadius: 10,
					}}
					source={{ uri: option.icon }}
					borderRadius={10}
				/>
				<Text>{option.label}</Text>
			</View>

			<View>{active && <Check color="#566674" size={16} />}</View>
		</Button>
	);
};

export default DropdownOption;
