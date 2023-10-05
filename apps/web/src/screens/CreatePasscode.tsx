import { CreatePasscode } from '@walless/app';
import { signInWithPasscode } from '@walless/auth';
import { auth } from 'utils/firebase';
import { router } from 'utils/routing';

export const CreatePasscodeScreen = () => {
	const handleOnComplete = async (passcode: string) => {
		await signInWithPasscode(passcode, auth.currentUser);
		router.navigate('/');
	};

	return <CreatePasscode onComplete={handleOnComplete} />;
};

export default CreatePasscodeScreen;
