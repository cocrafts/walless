import { DeprecatedPasscode } from '@walless/app';
import {
	initAndRegisterWallet,
	validateAndRecoverWithPasscode,
} from '@walless/auth';
import { navigate } from 'utils/navigation';

import { initLocalDeviceByPasscodeAndSync } from '../state/app/authentication';

export const DeprecatedPasscodeScreen = () => {
	const handleOnSuccess = async (passcode: string) => {
		const registeredAccount = await initAndRegisterWallet();
		if (registeredAccount?.identifier) {
			await initLocalDeviceByPasscodeAndSync(passcode);
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
