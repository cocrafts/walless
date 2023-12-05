import auth from '@react-native-firebase/auth';
import { Recovery } from '@walless/app';
import { recoverByEmergencyKey } from '@walless/auth';
import { logger } from '@walless/core';
import { navigate } from 'utils/navigation';

export const RecoveryScreen = () => {
	const handlePressContinue = async (key?: string) => {
		if (key && (await recoverByEmergencyKey(key))) {
			navigate('Authentication', { screen: 'CreatePasscode' });
		} else {
			logger.info('Wrong recovery key', {
				user: auth().currentUser,
			});
		}
	};

	return <Recovery onPressContinue={handlePressContinue} />;
};

export default RecoveryScreen;
