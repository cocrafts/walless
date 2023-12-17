import type { ViewStyle } from 'react-native';
import { floatActions, Recovery, useUniversalInsets } from '@walless/app';
import { recoverByEmergencyKey } from '@walless/auth';
import { navigate } from 'utils/navigation';

export const RecoveryScreen = () => {
	const insets = useUniversalInsets();
	const containerStyle: ViewStyle = {
		marginTop: insets.top,
		marginBottom: Math.max(insets.bottom, 24),
	};

	const handlePressContinue = async (key?: string) => {
		if (key && (await recoverByEmergencyKey(key))) {
			navigate('Authentication', { screen: 'CreatePasscode' });
		} else {
			floatActions.showError('Wrong recovery key');
		}
	};

	return (
		<Recovery style={containerStyle} onPressContinue={handlePressContinue} />
	);
};

export default RecoveryScreen;
