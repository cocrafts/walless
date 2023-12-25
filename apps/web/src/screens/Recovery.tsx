import type { ViewStyle } from 'react-native';
import { Recovery, useUniversalInsets } from '@walless/app';
import { recoverByEmergencyKey } from '@walless/auth';
import { router } from 'utils/routing';
import { showError } from 'utils/showError';

export const RecoveryScreen = () => {
	const insets = useUniversalInsets();
	const containerStyle: ViewStyle = {
		paddingTop: insets.top,
		paddingBottom: Math.max(insets.bottom, 24),
	};

	const handlePressContinue = async (key?: string) => {
		if (key && (await recoverByEmergencyKey(key))) {
			router.navigate('/create-passcode', { replace: true });
		} else {
			showError('Wrong recovery key');
		}
	};

	return (
		<Recovery style={containerStyle} onPressContinue={handlePressContinue} />
	);
};

export default RecoveryScreen;
