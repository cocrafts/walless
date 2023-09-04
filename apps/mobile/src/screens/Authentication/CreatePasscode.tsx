import { CreatePasscode } from '@walless/app';
import { appActions } from 'state/app';
import { navigate } from 'utils/navigation';

export const CreatePasscodeScreen = () => {
	const handleOnComplete = async (passcode: string) => {
		await appActions.signInWithPasscode(passcode);
		navigate('Dashboard');
	};

	return <CreatePasscode onComplete={handleOnComplete} />;
};

export default CreatePasscodeScreen;
