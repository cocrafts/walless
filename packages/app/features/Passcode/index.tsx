import { FC, useEffect, useState } from 'react';
import { Button, Image, Stack, Text } from '@walless/gui';

import PasscodeInput from './components/Input';
import { type PasscodeError } from './components/Warning';

interface Props {
	verticalTransition?: number;
	logoUri: { uri: string };
	title?: string;
	buttonTitle?: string;
	confirmation: boolean;
	autoConfirm?: boolean;
	pinCount?: number;
	errorProps?: PasscodeError;
	onConfirmChange?: (isConfirm: boolean) => void;
	onPasscodeInput?: (value: string, isConfirmation?: boolean) => void;
	onPasscodeEnter?: (value: string, isConfirmation?: boolean) => void;
}

export const PasscodeFeature: FC<Props> = ({
	verticalTransition = -130,
	logoUri,
	title = 'Create your passcode',
	buttonTitle = 'Continue',
	confirmation = false,
	autoConfirm = false,
	pinCount = 6,
	errorProps = { count: 0 },
	onConfirmChange,
	onPasscodeInput,
	onPasscodeEnter,
}) => {
	const [passcode, setPasscode] = useState('');
	const [confirmPasscode, setConfirmPasscode] = useState('');
	const [isConfirm, setIsConfirm] = useState(false);
	const [isValidPasscode, setIsValidPasscode] = useState(false);
	const [isIncorrectPasscode, setIsIncorrectPasscode] = useState(false);
	const [error, setError] = useState<PasscodeError>({ count: 0 });

	const handlePasscode = (passcode: string) => {
		if (isConfirm) {
			setConfirmPasscode(passcode);
		} else {
			setPasscode(passcode);
		}

		if (passcode.length === pinCount) {
			setIsValidPasscode(true);
		} else {
			setIsValidPasscode(false);
		}
	};

	const onPress = () => {
		if (!confirmation) {
			onPasscodeEnter?.(passcode, isConfirm);
		} else {
			if (isConfirm) {
				setIsIncorrectPasscode(confirmPasscode !== passcode);
				if (confirmPasscode === passcode) {
					onPasscodeEnter?.(passcode, isConfirm);
				}
			} else {
				setIsValidPasscode(false);
				setIsConfirm(true);
			}
		}
	};

	useEffect(() => {
		if (isIncorrectPasscode) {
			setInterval(() => setIsIncorrectPasscode(false), 100);
		}
	}, [isIncorrectPasscode]);

	useEffect(() => {
		if (autoConfirm) {
			if (isValidPasscode) {
				onPress();
			}
		}
	}, [isValidPasscode]);

	useEffect(() => {
		onConfirmChange?.(isConfirm);
	}, [isConfirm]);

	useEffect(() => {
		setIsIncorrectPasscode(true);
		setError(errorProps);
	}, [errorProps?.count]);

	return (
		<Stack
			horizontal
			flex={1}
			backgroundColor="#19232C"
			alignItems="center"
			justifyContent="center"
		>
			<Stack
				flex={1}
				maxWidth={410}
				maxHeight={600}
				paddingHorizontal={40}
				paddingVertical={50}
				y={verticalTransition}
			>
				<Stack alignItems="center">
					<Image src={logoUri} width={83} height={43} />
				</Stack>
				<Text paddingTop={60} fontSize={20} textAlign="center">
					{title}
				</Text>
				<Stack paddingTop={60}>
					<PasscodeInput
						pinCount={pinCount}
						isConfirm={isConfirm}
						isIncorrectPasscode={isIncorrectPasscode}
						onEnterPress={onPress}
						onPasscodeInput={onPasscodeInput}
						handlePasscode={handlePasscode}
					/>
					<Text
						position="absolute"
						bottom={-25}
						left={0}
						right={0}
						color="$warning"
						textAlign="center"
					>
						{error?.errorMessage}
					</Text>
				</Stack>
				{!autoConfirm && (
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
							{buttonTitle}
						</Text>
					</Button>
				)}
			</Stack>
		</Stack>
	);
};

export default PasscodeFeature;
export { type PasscodeError } from './components/Warning';
