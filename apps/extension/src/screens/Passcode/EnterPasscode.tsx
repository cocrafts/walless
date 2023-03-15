import React, { useState } from 'react';
import { Button, Image, Text, View } from '@walless/ui';
import { resources } from 'utils/config';
import { useSnapshot } from 'utils/hook';
import { appActions, appState } from 'utils/state/app';

import PasscodeInput from './Input';
import Warning from './Warning';

const logoSize = 80;

export const EnterPasscode: React.FC = () => {
	const { passcodeLoading, passcodeError } = useSnapshot(appState);
	const [isPasscodeValid, setIsPasscodeValid] = useState(false);
	const [passcode, setPasscode] = useState('');
	const [isPasscodeIncorrect, setIsPasscodeIncorrect] = useState(false);

	const handleActiveButton = (isPasscodeValid: boolean) => {
		setIsPasscodeValid(isPasscodeValid);
	};

	const handlePasscode = (value?: string | number) => {
		if (typeof value === 'string') {
			setPasscode(passcode + value);
		} else {
			setPasscode(passcode.slice(0, value));
		}
	};

	const handleButtonPress = async () => {
		await appActions.recoverWithPasscode(passcode);
	};

	const handleCloseWarning = () => {
		setIsPasscodeIncorrect(false);
	};

	return (
		<View className="px-16 py-8 justify-center items-center flex-1 bg-[color:#011726]">
			<Image
				source={resources.app.icon}
				resizeMode="contain"
				style={{ width: logoSize, height: logoSize }}
			/>
			<Warning
				isPasscodeIncorrect={isPasscodeIncorrect}
				handleCloseWarning={handleCloseWarning}
			/>
			<View className="items-center">
				<Text className="mt-7 text-xl text-center mb-[68px] w-full">
					Enter your passcode
				</Text>

				<PasscodeInput
					confirmPasscode={passcode}
					handleActiveButton={handleActiveButton}
					handlePasscode={handlePasscode}
				/>
				<Button
					className={`w-[282px] mt-12 py-3 px-2 rounded-lg bg-gradient-to-r from-[color:#1BA0DA] to-[color:#8FC5BE] ${
						!isPasscodeValid &&
						'to-[color:#C1C1C1] from-[color:#717272] opacity-20'
					}`}
					title="Continue"
					disabled={!isPasscodeValid}
					loading={passcodeLoading}
					onPress={handleButtonPress}
				/>
				{!!passcodeError && (
					<Text className="mt-5 text-xs text-red-500">{passcodeError}</Text>
				)}
			</View>
		</View>
	);
};

export default EnterPasscode;
