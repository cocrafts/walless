import { Recovery } from '@walless/app';
import { recoverByEmergencyKey } from '@walless/auth';
import { navigate } from 'utils/navigation';

export const RecoveryScreen = () => {
	const handlePressContinue = async (key?: string) => {
		if (key && (await recoverByEmergencyKey(key))) {
			navigate('CreatePasscode');
		} else {
			console.log('Wrong recovery key');
		}
	};

	return <Recovery onPressContinue={handlePressContinue} />;
};

export default RecoveryScreen;
