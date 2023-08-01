import {
	configureSecurityQuestionShare,
	recoverDeviceShareFromPasscode,
} from '../w3a';

export const setupRemotePasscode = async (passcode: string) => {
	await configureSecurityQuestionShare(passcode);
};

export const validateAndRecoverWithPasscode = async (passcode: string) => {
	const unlockSuccess = await recoverDeviceShareFromPasscode(passcode);
	return unlockSuccess;
};
