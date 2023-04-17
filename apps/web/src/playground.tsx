import { FC, useState } from 'react';
import { TamaguiInternalConfig } from '@tamagui/core';
import { PinInput } from '@walless/app';
import { GuiProvider, Stack, Text } from '@walless/gui';

interface Props {
	tamaguiConfig: TamaguiInternalConfig;
}

export const AppContainer: FC<Props> = ({ tamaguiConfig }) => {
	const [pin, setPin] = useState('');
	const [error, setError] = useState('');

	const handlePinChange = (value: string, isCompleted?: boolean) => {
		setPin(value);

		if (isCompleted) {
			if (value === '123456') {
				console.log('correct');
			} else {
				console.log('incorrect');
				setPin('');
				setError('Incorrect PIN');
			}
		}
	};

	return (
		<GuiProvider config={tamaguiConfig} theme="dark">
			<Stack flex={1} alignItems="center" justifyContent="center">
				<PinInput value={pin} onPinChange={handlePinChange} />
				{error.length > 0 && (
					<Text color="red" marginTop={12}>
						{error}
					</Text>
				)}
			</Stack>
		</GuiProvider>
	);
};

export default AppContainer;
