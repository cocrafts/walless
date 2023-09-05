import { DeprecatedPasscode } from '@walless/app';
import { signInWithPasscode } from '@walless/auth';
import { validateAndRecoverWithPasscode } from 'utils/authentication';
import { initAndRegisterWallet } from 'utils/authentication';
import { auth } from 'utils/firebase';
import { router } from 'utils/routing';
import { showError } from 'utils/showError';

export const DeprecatedPasscodeScreen = () => {
	const handleOnSuccess = async (passcode: string) => {
		const registeredAccount = await initAndRegisterWallet();
		if (registeredAccount?.identifier) {
			await signInWithPasscode(passcode, auth.currentUser);
			router.navigate('/');
		} else {
			showError('Error during migrate account, please contact developer!');
		}
	};

	return (
		<DeprecatedPasscode
			validatePasscode={validateAndRecoverWithPasscode}
			onSuccess={handleOnSuccess}
		/>
	);
};

export default DeprecatedPasscodeScreen;
