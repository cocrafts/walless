import {
	configureSecurityQuestionShare,
	recoverDeviceShareFromPasscode,
} from './w3a';

/**
 * @deprecated
 * This method is deprecated by using recovery flow
 * */
export const setupRemotePasscode = async (passcode: string) => {
	await configureSecurityQuestionShare(passcode);
};

/**
 * @deprecated
 * This method is deprecated by using recovery flow
 * */
export const validateAndRecoverWithPasscode = async (passcode: string) => {
	const unlockSuccess = await recoverDeviceShareFromPasscode(passcode);
	return unlockSuccess;
};
