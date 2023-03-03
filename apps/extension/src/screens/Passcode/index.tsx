import React, { useState } from 'react';
import { Button, Image, Text, TextInput, View } from '@walless/ui';
import { resources } from 'utils/config';
import { useNavigate } from 'utils/hook';
import {
	generateNewShareWithPassword,
	initializeNewKey,
	recoverShareByPassword,
} from 'utils/w3a-v2';

const logoSize = 120;

export const Passcode: React.FC = () => {
	const navigate = useNavigate();
	const [passcodeAvailable, setPasscodeAvailable] = useState(false);
	const [passcode, setPasscode] = useState('');

	const heading = passcodeAvailable
		? 'Confirm your passcode'
		: 'Create your passcode';

	const buttonTitle = passcodeAvailable ? 'Confirm' : 'Continue';

	const handleButtonPress = async () => {
		if (passcodeAvailable) {
			navigate('/explore');
			await initializeNewKey();
			await generateNewShareWithPassword(passcode);
			console.log('Generate share passcode success');
			console.log(await recoverShareByPassword(passcode));
		} else if (passcode.length != 6) {
			console.log('Type passcode');
		} else {
			setPasscodeAvailable(!passcodeAvailable);
		}
	};

	const onChangeNumber = async (value: string) => {
		console.log(value);
		setPasscode(value);
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
				{!passcodeAvailable && (
					<Text className="text-center text-light-gray font-light text-xs mt-2">
						By setting passcode/password, your account will be more secured to
						external threats.
					</Text>
				)}
				<TextInput
					className="text-center font-light text-xl mt-2 text-white border border-dark px-2 py-2"
					onChangeText={onChangeNumber}
					keyboardType="numeric"
				/>
				<Button
					className="w-full mt-8 py-3 px-2 rounded-full bg-gradient-to-r from-coal-start to-coal-end"
					title={buttonTitle}
					onPress={handleButtonPress}
				/>
			</View>
		</View>
	);
};

export default Passcode;
