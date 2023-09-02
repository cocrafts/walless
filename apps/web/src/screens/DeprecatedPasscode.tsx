import { DeprecatedPasscode } from '@walless/app';
import { appActions } from 'state/app';
import { validateAndRecoverWithPasscode } from 'utils/authentication';
import { initAndRegisterWallet } from 'utils/authentication';
import { router } from 'utils/routing';
import { showError } from 'utils/showError';

export const DeprecatedPasscodeScreen = () => {
	const handleOnSuccess = async (passcode: string) => {
		const registeredAccount = await initAndRegisterWallet();
		if (registeredAccount?.identifier) {
			await appActions.initLocalDeviceByPasscodeAndSync(passcode);
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
