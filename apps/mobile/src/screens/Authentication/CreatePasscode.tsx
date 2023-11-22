import auth from '@react-native-firebase/auth';
import { CreatePasscode } from '@walless/app';
import { showError } from '@walless/app/features/Send/utils';
import { signInWithPasscode } from '@walless/auth';
import { navigate } from 'utils/navigation';

export const CreatePasscodeScreen = () => {
	const handleInitFail = () => {
		showError('Something went wrong. Please try again.');
		navigate('Authentication', { screen: 'Login' });
	};

	const handleOnComplete = async (passcode: string) => {
		await signInWithPasscode(passcode, auth().currentUser, handleInitFail);
		navigate('Dashboard');
	};

	return <CreatePasscode onComplete={handleOnComplete} />;
};

export default CreatePasscodeScreen;
