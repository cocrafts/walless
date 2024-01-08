import { DeprecatedPasscode } from '@walless/app';
import {
	initAndRegisterWallet,
	signInWithPasscode,
	validateAndRecoverWithPasscode,
} from '@walless/auth';
import { showError } from 'modals/Error';
import { auth } from 'utils/firebase';
import { navigate } from 'utils/navigation';

export const DeprecatedPasscodeScreen = () => {
	const handleOnSuccess = async (passcode: string) => {
		const registeredAccount = await initAndRegisterWallet();
		if (registeredAccount?.identifier) {
			await signInWithPasscode(passcode, auth().currentUser);
			navigate('Dashboard');
		} else {
			showError({
				errorText: 'Error during migrate account, please contact developer!',
			});
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
