import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { PasscodeFeature } from '@walless/app';
import { appActions } from 'state/app';

const logoUri = { uri: '/img/bare-icon.png' };

interface Params {
	feature: string;
}

export const PasscodeScreen = () => {
	const { feature } = useLoaderData() as Params;
	const isCreate = feature === 'create';
	const [isConfirm, setIsConfirm] = useState(false);

	const title = !isCreate
		? 'Enter your passcode'
		: !isConfirm
		? 'Create your passcode'
		: 'Confirm your passcode';

	const onPasscodeInput = (value: string, isConfirmation?: boolean) => {
		console.log(isConfirmation);
	};

	const onPasscodeEnter = (passcode: string, isConfirmation?: boolean) => {
		console.log(isConfirmation);
		if (isCreate) {
			appActions.confirmPasscode(passcode);
		} else {
			appActions.recoverWithPasscode(passcode);
		}
	};

	const onConfirmChange = (isConfirm: boolean) => {
		setIsConfirm(isConfirm);
	};

	return (
		<PasscodeFeature
			logoUri={logoUri}
			title={title}
			confirmation={isCreate}
			autoConfirm
			onConfirmChange={onConfirmChange}
			onPasscodeInput={onPasscodeInput}
			onPasscodeEnter={onPasscodeEnter}
		/>
	);
};

export default PasscodeScreen;
