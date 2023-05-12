import { type FC, useState } from 'react';
import { TextInput } from 'react-native';
import { Button, Stack, Text } from '@walless/ui';

interface Props {
	onSubmit: (value: string) => void;
}

const InputAddress: FC<Props> = ({ onSubmit }) => {
	const [value, setValue] = useState('');
	const handleSubmit = () => onSubmit(value);

	return (
		<Stack
			backgroundColor="#19232C"
			paddingHorizontal={5}
			borderRadius={8}
			flexDirection="row"
			gap={4}
		>
			<TextInput onChangeText={(text) => setValue(text)} />
			<Stack>
				<Button
					padding={10}
					borderRadius={8}
					backgroundColor={'transparent'}
					onPress={handleSubmit}
				>
					<Text fontSize={12} color={'#566674'}>
						Add more
					</Text>
				</Button>
			</Stack>
		</Stack>
	);
};

export default InputAddress;
