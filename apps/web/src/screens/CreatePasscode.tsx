import { CreatePasscode } from '@walless/app';
import { appActions } from 'state/app';
import { router } from 'utils/routing';

export const CreatePasscodeScreen = () => {
	const handleOnComplete = async (passcode: string) => {
		await appActions.initLocalDeviceByPasscodeAndSync(passcode);
		router.navigate('/');
	};

	return <CreatePasscode onComplete={handleOnComplete} />;
};

export default CreatePasscodeScreen;
