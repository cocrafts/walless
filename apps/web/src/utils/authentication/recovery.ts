import { gotenksClient, mutations } from '@walless/graphql';
import { BN } from 'bn.js';
import { key } from 'utils/w3a';

export const initAndSendRecoveryCode = async () => {
	try {
		await key.reconstructKey();
		const newShare = await key.generateNewShare();
		const recoveryKey =
			newShare.newShareStores[
				newShare.newShareIndex.toString('hex')
			].share.share.toString('hex');

		// send email
		console.log(recoveryKey, '<-- recovery key');
		await gotenksClient.request<{
			messageId: string;
		}>(mutations.sendEmergencyKit, {
			key: recoveryKey,
			receiver: 'sample@gmail.com',
		});

		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
};

export const recoverByRecoveryKey = async (recoveryKey: string) => {
	try {
		await key.inputShare(new BN(recoveryKey, 'hex'));
		await key.reconstructKey();
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
};
