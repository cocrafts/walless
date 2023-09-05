import auth from '@react-native-firebase/auth';
import { CreatePasscode } from '@walless/app';
import { signInWithPasscode } from '@walless/auth';
import { navigate } from 'utils/navigation';

export const CreatePasscodeScreen = () => {
	const handleOnComplete = async (passcode: string) => {
		await signInWithPasscode(passcode, auth().currentUser);
		navigate('Dashboard');
	};

	return <CreatePasscode onComplete={handleOnComplete} />;
};

export default CreatePasscodeScreen;
