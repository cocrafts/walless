import React, { useState } from 'react';
import { Button, Image, Text, View } from '@walless/ui';
import { resources } from 'utils/config';
import { useNavigate, useSnapshot } from 'utils/hook';
import { encryptKey } from 'utils/state/encryptKey';

import PasscodeInput from './Input';

const logoSize = 120;

export const Passcode: React.FC = () => {
	const navigate = useNavigate();
	const [isConfirmPhase, setIsConfirmPhase] = useState(false);
	const [isPasscodeValid, setIsPasscodeValid] = useState(false);
	const [confirmPasscode, setConfirmPasscode] = useState('');
	const { passcode } = useSnapshot(encryptKey);

	const heading = isConfirmPhase
		? 'Confirm your passcode'
		: 'Create your passcode';

	const buttonTitle = isConfirmPhase ? 'Cofirm' : 'Continue';

	const handleActiveButton = (isPasscodeValid: boolean) => {
		setIsPasscodeValid(isPasscodeValid);
	};

	const handleButtonPress = () => {
		if (isConfirmPhase) {
			if (confirmPasscode === passcode) {
				navigate('/explore');
			} else {
				setConfirmPasscode('');
			}
		} else {
			setIsConfirmPhase(!isConfirmPhase);
		}
	};

	const handleConfirmPasscode = (value?: string | number) => {
		if (typeof value === 'string') {
			setConfirmPasscode(confirmPasscode + value);
		} else setConfirmPasscode(confirmPasscode.slice(0, value));
	};

	const handleWrongInput = (err: string) => {
		console.log(err);
	};

	return (
		<View className="w-full px-10 py-8 items-center">
			<Image
				source={resources.app.icon}
				resizeMode="contain"
				style={{ width: logoSize, height: logoSize }}
			/>
			<View className="mt-20 items-center">
				<Text className="text-2xl">{heading}</Text>
				{!isConfirmPhase && (
					<Text className="text-center text-light-gray font-light text-xs mt-2">
						By setting passcode/password, your account will be more secured to
						external threats.
					</Text>
				)}
				<PasscodeInput
					isConfirmPhase={isConfirmPhase}
					confirmPasscode={confirmPasscode}
					handleActiveButton={handleActiveButton}
					handleConfirmPasscode={handleConfirmPasscode}
					handleWrongInput={handleWrongInput}
				/>
				<Button
					className="w-full mt-8 py-3 px-2 rounded-full bg-gradient-to-r from-coal-start to-coal-end"
					title={buttonTitle}
					disabled={!isPasscodeValid}
					onPress={handleButtonPress}
				/>
			</View>
		</View>
	);
};

export default Passcode;
