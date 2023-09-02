import { CreatePasscode } from '@walless/app';
import { navigate } from 'utils/navigation';

import { initLocalDeviceByPasscodeAndSync } from '../state/app/authentication';

export const CreatePasscodeScreen = () => {
	const handleOnComplete = async (passcode: string) => {
		await initLocalDeviceByPasscodeAndSync(passcode);
		navigate('Dashboard');
	};

	return <CreatePasscode onComplete={handleOnComplete} />;
};

export default CreatePasscodeScreen;
