import auth from '@react-native-firebase/auth';
import { DeprecatedPasscode } from '@walless/app';
import {
	initAndRegisterWallet,
	signInWithPasscode,
	validateAndRecoverWithPasscode,
} from '@walless/auth';
import { navigate } from 'utils/navigation';

export const DeprecatedPasscodeScreen = () => {
	const handleOnSuccess = async (passcode: string) => {
		const registeredAccount = await initAndRegisterWallet();
		if (registeredAccount?.identifier) {
			await signInWithPasscode(passcode, auth().currentUser);
			navigate('Dashboard');
		} else {
			console.log('Error during migrate account, please contact developer!');
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
