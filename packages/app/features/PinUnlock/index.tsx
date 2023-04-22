import { FC, useEffect, useRef, useState } from 'react';
import { Stack, Text } from '@walless/ui';

import PinInput from '../../components/PinInput';

interface Props {
	pinValue?: string;
	pinCount?: number;
	createPin?: boolean;
	onPinChange?: (value: string, isCompleted?: boolean) => void;
	error?: string;
}

export const PinUnlockFeature: FC<Props> = ({
	pinValue = '',
	pinCount = 6,
	createPin = false,
	onPinChange,
	error = '',
}) => {
	const createPinRef = useRef({ value: '', isConfirmation: false });
	const [innerPin, setInnerPin] = useState(pinValue);
	const [innerError, setInnerError] = useState(error);

	const handlePinChange = (value: string, isCompleted?: boolean) => {
		let nextValue = value;
		let nextIsCompleted = isCompleted;

		const isFirstPinCompleted =
			isCompleted && !createPinRef.current.isConfirmation;
		const isSecondPinCompleted =
			isCompleted && createPinRef.current.isConfirmation;

		if (createPin) {
			if (isFirstPinCompleted) {
				nextValue = '';
				nextIsCompleted = false;
				createPinRef.current = { value, isConfirmation: true };
			} else if (isSecondPinCompleted) {
				if (nextValue !== createPinRef.current.value) {
					nextValue = '';
					nextIsCompleted = false;
					setInnerError('PINs do not match');
				}
			}
		}

		setInnerPin(nextValue);
		onPinChange?.(nextValue, nextIsCompleted);
	};

	useEffect(() => setInnerPin(pinValue), [pinValue]);
	useEffect(() => setInnerError(error), [error]);

	return (
		<Stack flex={1} alignItems="center" justifyContent="center">
			<PinInput
				value={innerPin}
				pinCount={pinCount}
				onPinChange={handlePinChange}
			/>
			{innerError.length > 0 && (
				<Text color="red" marginTop={12}>
					{innerError}
				</Text>
			)}
		</Stack>
	);
};

export default PinUnlockFeature;
