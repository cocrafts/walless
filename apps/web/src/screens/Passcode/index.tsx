import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Button, Image, Stack, Text } from '@walless/gui';
import { appActions } from 'state/app';

import PasscodeInput from './components/Input';

const logoUri = { uri: '/img/bare-icon.png' };

interface Params {
	feature: string;
}

export const PasscodeScreen = () => {
	const [passcode, setPasscode] = useState('');
	const [confirmPasscode, setConfirmPasscode] = useState('');
	const [isConfirm, setIsConfirm] = useState(false);
	const [isValidPasscode, setIsValidPasscode] = useState(false);
	const [isIncorrectPasscode, setIsIncorrectPasscode] = useState(false);
	const { feature } = useLoaderData() as Params;

	const title =
		feature === 'enter'
			? 'Enter your passcode'
			: isConfirm
			? 'Confirm your passcode'
			: 'Create your passcode';

	const handlePasscode = (passcode: string) => {
		if (isConfirm) {
			setConfirmPasscode(passcode);
		} else {
			setPasscode(passcode);
		}

		if (passcode.length === 6) {
			setIsValidPasscode(true);
		} else {
			setIsValidPasscode(false);
		}
	};

	const onPress = async () => {
		if (feature === 'enter') {
			await appActions.recoverWithPasscode(passcode);
		} else {
			if (isConfirm) {
				setIsIncorrectPasscode(confirmPasscode !== passcode);
				if (confirmPasscode === passcode) {
					await appActions.confirmPasscode(passcode);
				}
			} else {
				setIsConfirm(true);
			}
		}
	};

	useEffect(() => {
		if (isIncorrectPasscode) {
			setInterval(() => setIsIncorrectPasscode(false), 100);
		}
	}, [isIncorrectPasscode]);

	return (
		<Stack
			flex={1}
			backgroundColor="#19232C"
			alignItems="center"
			justifyContent="center"
		>
			<Stack
				width={410}
				height={600}
				paddingHorizontal={40}
				paddingVertical={50}
			>
				<Stack alignItems="center">
					<Image src={logoUri} width={83} height={43} />
				</Stack>
				<Text paddingTop={60} fontSize={20} textAlign="center">
					{title}
				</Text>
				<Stack paddingTop={60}>
					<PasscodeInput
						isConfirm={isConfirm}
						isIncorrectPasscode={isIncorrectPasscode}
						handlePasscode={handlePasscode}
					/>
				</Stack>
				<Button
					marginTop={60}
					paddingVertical={13}
					disabled={!isValidPasscode}
					onPress={onPress}
				>
					<Text
						fontSize={14}
						fontWeight="500"
						color={isValidPasscode ? '#FFFFFF' : '#566674'}
					>
						Continue
					</Text>
				</Button>
			</Stack>
		</Stack>
	);
};

export default PasscodeScreen;
