import React, { useState } from 'react';
import { Button, Image, Text, View } from '@walless/ui';
import { resources } from 'utils/config';
import { useNavigate, useSnapshot } from 'utils/hook';
import { encryptKey } from 'utils/state/encryptKey';
import { key } from 'utils/tkey';
import { initPasscode } from 'utils/w3a-v3';

import PasscodeInput from './Input';
import Warning from './Warning';

const logoSize = 120;

export const Passcode: React.FC = () => {
	const navigate = useNavigate();
	const [isConfirmPhase, setIsConfirmPhase] = useState(false);
	const [isPasscodeValid, setIsPasscodeValid] = useState(false);
	const [confirmPasscode, setConfirmPasscode] = useState('');
	const [isPasscodeIncorrect, setIsPasscodeIncorrect] = useState(false);
	const { passcode } = useSnapshot(encryptKey);

	const heading = isConfirmPhase
		? 'Confirm your passcode'
		: 'Create your passcode';

	const buttonTitle = isConfirmPhase ? 'Confirm' : 'Continue';

	const handleActiveButton = (isPasscodeValid: boolean) => {
		setIsPasscodeValid(isPasscodeValid);
	};

	const handleButtonPress = async () => {
		if (isConfirmPhase) {
			if (confirmPasscode === passcode) {
				console.log('Init passcode');
				console.log(key.privKey);
				const status = await initPasscode(passcode);
				console.log(key.getKeyDetails());
				console.log(status);
				navigate('/explore');
			} else {
				setIsPasscodeIncorrect(!isPasscodeIncorrect);
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

	const handleCloseWarning = () => {
		setIsPasscodeIncorrect(false);
	};

	const onCancelPress = () => {
		encryptKeyActions.resetPasscode();
		setConfirmPasscode('');
		setIsPasscodeIncorrect(false);
		setIsConfirmPhase(!isConfirmPhase);
	};

	return (
		<View className="w-full px-10 py-8 items-center">
			<Warning
				isConfirmPhase={isConfirmPhase}
				isPasscodeIncorrect={isPasscodeIncorrect}
				handleCloseWarning={handleCloseWarning}
			/>
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
				{isConfirmPhase && (
					<TouchableWithoutFeedback onPress={onCancelPress}>
						<Text className="text-[color:#87E5E4] mt-2">Cancel</Text>
					</TouchableWithoutFeedback>
				)}
			</View>
		</View>
	);
};

export default Passcode;
