import React, { useState } from 'react';
import { Button, Image, Text, View } from '@walless/ui';
import { resources } from 'utils/config';
import { useNavigate } from 'utils/hook';

const logoSize = 120;

export const Passcode: React.FC = () => {
	const navigate = useNavigate();
	const [passcodeAvailable, setPasscodeAvailable] = useState(false);

	const heading = passcodeAvailable
		? 'Confirm your passcode'
		: 'Create your passcode';

	const buttonTitle = passcodeAvailable ? 'Cofirm' : 'Continue';

	const handleButtonPress = () => {
		if (passcodeAvailable) {
			navigate('/explore');
		} else {
			setPasscodeAvailable(!passcodeAvailable);
		}
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
				{}
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
