import { FC, useState } from 'react';
import { Stack, Text } from '@walless/gui';

import PinInput from '../../components/PinInput';

export const PinUnlockFeature: FC = () => {
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
		<Stack flex={1} alignItems="center" justifyContent="center">
			<PinInput value={pin} onPinChange={handlePinChange} />
			{error.length > 0 && (
				<Text color="red" marginTop={12}>
					{error}
				</Text>
			)}
		</Stack>
	);
};

export default PinUnlockFeature;
