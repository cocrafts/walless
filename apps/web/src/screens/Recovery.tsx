import { Recovery } from '@walless/app';
import { recoverByEmergencyKey } from '@walless/auth';
import { router } from 'utils/routing';
import { showError } from 'utils/showError';

export const RecoveryScreen = () => {
	const handlePressContinue = async (key?: string) => {
		if (key && (await recoverByEmergencyKey(key))) {
			router.navigate('/create-passcode', { replace: true });
		} else {
			showError('Wrong recovery key');
		}
	};

	return <Recovery onPressContinue={handlePressContinue} />;
};

export default RecoveryScreen;
