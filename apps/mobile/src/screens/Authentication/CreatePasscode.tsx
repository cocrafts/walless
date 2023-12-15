import { CreatePasscode } from '@walless/app';
import { floatActions } from '@walless/app';
import { signInWithPasscode } from '@walless/auth';
import { appState } from '@walless/engine';
import { auth } from 'utils/firebase';
import { useBiometricStatus, useSafeAreaInsets } from 'utils/hooks';
import { hydrateEncryptionKey } from 'utils/native';
import { navigate } from 'utils/navigation';

import BiometricIcon from './BiometricIcon';

export const CreatePasscodeScreen = () => {
	const insets = useSafeAreaInsets();
	const biometricStatus = useBiometricStatus();
	const style = {
		paddingTop: insets.top,
		paddingBottom: insets.bottom,
	};

	const handleInitFail = () => {
		floatActions.showError('Something went wrong. Please try again.');
		navigate('Authentication', { screen: 'Login' });
	};

	const handleOnComplete = async (passcode: string) => {
		if (biometricStatus.isAvailable) {
			await hydrateEncryptionKey(passcode);
		}

		await signInWithPasscode(passcode, auth().currentUser, handleInitFail);

		appState.profileReady = true; // need this to force render Dashboard route
		setTimeout(() => {
			navigate('Dashboard', {
				screen: 'Explore',
				params: {
					screen: 'Widget',
				} as never,
			});
		}, 20); // delay abit, wait for Dashboard rendering
	};

	const biometricIcon = biometricStatus.isAvailable && (
		<BiometricIcon status={biometricStatus} />
	);

	return (
		<CreatePasscode
			style={style}
			onComplete={handleOnComplete}
			biometricIcon={biometricIcon}
		/>
	);
};

export default CreatePasscodeScreen;
