import auth from '@react-native-firebase/auth';
import { DeprecatedPasscode } from '@walless/app';
import {
	initAndRegisterWallet,
	signInWithPasscode,
	validateAndRecoverWithPasscode,
} from '@walless/auth';
import { logger } from '@walless/core';
import { navigate } from 'utils/navigation';

export const DeprecatedPasscodeScreen = () => {
	const handleOnSuccess = async (passcode: string) => {
		const registeredAccount = await initAndRegisterWallet();
		if (registeredAccount?.identifier) {
			await signInWithPasscode(passcode, auth().currentUser);
			navigate('Dashboard');
		} else {
			logger.info('Error during migrate account!', {
				user: auth().currentUser,
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
