import { type FC, useState } from 'react';
import { TextInput } from 'react-native';
import { Plus } from '@walless/icons';
import { Button, Stack } from '@walless/ui';

interface Props {
	address?: string;
	onSubmit: (value: string) => void;
}

const InputAddress: FC<Props> = ({ address = '', onSubmit }) => {
	const [value, setValue] = useState(address);
	const handleSubmit = () => {
		onSubmit(value);
		setValue('');
	};

	return (
		<Stack
			backgroundColor="#19232C"
			paddingHorizontal={5}
			borderRadius={8}
			flexDirection="row"
			gap={4}
		>
			<TextInput value={value} onChangeText={(text) => setValue(text)} />
			<Stack>
				<Button
					padding={10}
					borderRadius={8}
					backgroundColor={'transparent'}
					onPress={handleSubmit}
				>
					<Plus size={18} color={'#566674'} />
				</Button>
			</Stack>
		</Stack>
	);
};

export default InputAddress;
