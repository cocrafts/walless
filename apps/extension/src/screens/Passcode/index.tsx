import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Button, Image, Text, View } from '@walless/ui';
import { resources } from 'utils/config';
import { appActions } from 'utils/state/app';

import PasscodeInput from './Input';
import Warning from './Warning';

const logoSize = 80;

export const Passcode: React.FC = () => {
	const [passcode, setPasscode] = useState('');
	const [isConfirmPhase, setIsConfirmPhase] = useState(false);
	const [isPasscodeValid, setIsPasscodeValid] = useState(false);
	const [confirmPasscode, setConfirmPasscode] = useState('');
	const [isPasscodeIncorrect, setIsPasscodeIncorrect] = useState(false);

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
				await appActions.confirmPasscode(passcode);
			} else {
				setIsPasscodeIncorrect(true);
				setConfirmPasscode('');
			}
		} else {
			setIsConfirmPhase(!isConfirmPhase);
		}
	};

	const handlePasscode = (value?: string | number) => {
		if (isConfirmPhase) {
			if (typeof value === 'string') {
				setConfirmPasscode(confirmPasscode + value);
			} else {
				setConfirmPasscode(confirmPasscode.slice(0, value));
			}
		} else {
			if (typeof value === 'string') {
				setPasscode(passcode + value);
			} else {
				setPasscode(passcode.slice(0, value));
			}
		}
	};

	const handleWrongInput = (err: string) => {
		console.log(err);
	};

	const handleCloseWarning = () => {
		setIsPasscodeIncorrect(false);
	};

	const onCancelPress = () => {
		setPasscode('');
		setConfirmPasscode('');
		setIsPasscodeIncorrect(false);
		setIsConfirmPhase(!isConfirmPhase);
	};

	return (
		<View className="px-16 py-8 justify-start items-center max-w-[410px] max-h-[600px] flex-1 bg-gradient-to-b from-[#003356] to-[#011726]">
			<Image
				source={resources.app.icon}
				resizeMode="contain"
				style={{ width: logoSize, height: logoSize }}
			/>
			<Warning
				isConfirmPhase={isConfirmPhase}
				isPasscodeIncorrect={isPasscodeIncorrect}
				handleCloseWarning={handleCloseWarning}
			/>
			<View className="items-center">
				<Text
					className={`mt-7 text-xl text-center ${
						isConfirmPhase && 'mb-[68px] w-full'
					}`}
				>
					{heading}
				</Text>
				{!isConfirmPhase && (
					<Text className="text-center [color:#587A90] font-light text-xs mt-2 mb-7">
						By setting passcode/password, your account will be more secured to
						external threats.
					</Text>
				)}
				<PasscodeInput
					isConfirmPhase={isConfirmPhase}
					confirmPasscode={confirmPasscode}
					handleActiveButton={handleActiveButton}
					handlePasscode={handlePasscode}
					handleWrongInput={handleWrongInput}
				/>
				<Button
					className={`w-[282px] mt-12 py-3 px-2 rounded-lg bg-gradient-to-r ${
						isPasscodeValid
							? 'from-[color:#1BA0DA] to-[color:#8FC5BE]'
							: 'to-[color:#C1C1C1] from-[color:#717272] opacity-20'
					}`}
					title={buttonTitle}
					disabled={!isPasscodeValid}
					onPress={handleButtonPress}
				/>
				{isConfirmPhase && (
					<TouchableWithoutFeedback onPress={onCancelPress}>
						<Text className="[color:#87E5E4] mt-2">Cancel</Text>
					</TouchableWithoutFeedback>
				)}
			</View>
		</View>
	);
};

export default Passcode;
