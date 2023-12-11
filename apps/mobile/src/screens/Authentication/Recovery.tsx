import type { ViewStyle } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Recovery, useSafeAreaInsets } from '@walless/app';
import { recoverByEmergencyKey } from '@walless/auth';
import { logger } from '@walless/core';
import { navigate } from 'utils/navigation';

export const RecoveryScreen = () => {
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		marginTop: insets.top,
		marginBottom: insets.bottom,
	};

	const handlePressContinue = async (key?: string) => {
		if (key && (await recoverByEmergencyKey(key))) {
			navigate('Authentication', { screen: 'CreatePasscode' });
		} else {
			logger.info('Wrong recovery key', {
				user: auth().currentUser,
			});
		}
	};

	return (
		<Recovery style={containerStyle} onPressContinue={handlePressContinue} />
	);
};

export default RecoveryScreen;
