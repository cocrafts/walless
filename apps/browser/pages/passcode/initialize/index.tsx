import React, { useState } from 'react';
import { Button, Stack, Text } from '@walless/wui';
import { useRouter } from 'next/router';

import PasscodeInput from '../PasscodeInput';

const InitializePasscode: React.FC = () => {
	const [initialPasscode, setInitialPasscode] = useState('');
	const [isConfirmPhase, setIsConfirmPhase] = useState(false);
	const [isActiveButton, setIsActiveButton] = useState(false);
	const [confirmPasscode, setConfirmPasscode] = useState('');
	const [isPasscodeIncorrect, setIsPasscodeIncorrect] = useState(false);
	const router = useRouter();

	const buttonTitle = isConfirmPhase ? 'Confirm' : 'Continue';

	const handleActiveButton = (isPasscodeValid: boolean) => {
		setIsActiveButton(isPasscodeValid);
	};

	const handleButtonPress = () => {
		if (isConfirmPhase) {
			if (confirmPasscode === initialPasscode) {
				router.push('/');
			} else {
				setIsPasscodeIncorrect(true);
				setConfirmPasscode('');
			}
		} else {
			setIsConfirmPhase(!isConfirmPhase);
		}
	};

	const handleEnterKeyPress = () => {
		handleButtonPress();
	};

	const handleInputPasscode = (value?: string | number) => {
		if (isConfirmPhase) {
			if (typeof value === 'string') {
				setConfirmPasscode(confirmPasscode + value);
			} else {
				setConfirmPasscode(confirmPasscode.slice(0, value));
			}
		} else {
			if (typeof value === 'string') {
				setInitialPasscode(initialPasscode + value);
			} else {
				setInitialPasscode(initialPasscode.slice(0, value));
			}
		}
	};

	const handleWrongInput = (err: string) => {
		console.log(err);
	};

	return (
		<Stack flex={1} alignItems="center" justifyContent="center">
			<Stack width={410} height={600} paddingHorizontal={15}>
				<PasscodeInput
					isConfirmPhase={isConfirmPhase}
					confirmPasscode={confirmPasscode}
					handleActiveButton={handleActiveButton}
					handleInputPasscode={handleInputPasscode}
					handleWrongInput={handleWrongInput}
					handleEnterKeyPress={handleEnterKeyPress}
				/>
				<Button disabled={!isActiveButton} onPress={handleButtonPress}>
					{buttonTitle}
				</Button>
			</Stack>
		</Stack>
	);
};

export default InitializePasscode;
