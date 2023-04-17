import { FC, useState } from 'react';
import {
	type ModalConfigs,
	type PasscodeError,
	PasscodeFeature,
} from '@walless/app';
import { ResponseCode } from '@walless/messaging';
import {
	type PendingTransactionContext,
	transactionActions,
} from 'state/transaction';

import ModalWrapper from '../components/ModalWrapper';

const logoUri = { uri: '/img/bare-icon.png' };

interface Props {
	config: ModalConfigs & { context: PendingTransactionContext };
}

export const PasscodeScreen: FC<Props> = ({ config }) => {
	const [error, setError] = useState<PasscodeError>({ count: 0 });

	const onPasscodeEnter = async (passcode: string) => {
		const res = await transactionActions.createAndSend(
			config.context,
			passcode,
		);

		if (res?.responseCode === ResponseCode.WRONG_PASSCODE) {
			setError({
				errorCode: res?.responseCode,
				errorMessage: 'Wrong passcode',
				count: error.count + 1,
			});
		} else if (res?.responseCode === ResponseCode.ERROR) {
			setError({
				errorCode: res?.responseCode,
				errorMessage: res.message,
				count: error.count + 1,
			});
		}
	};

	return (
		<ModalWrapper>
			<PasscodeFeature
				verticalTransition={0}
				logoUri={logoUri}
				title="Confirm to transfer"
				confirmation={false}
				errorProps={error}
				onPasscodeEnter={onPasscodeEnter}
			/>
		</ModalWrapper>
	);
};

export default PasscodeScreen;
