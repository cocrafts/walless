import type { FC } from 'react';
import type { Networks } from '@walless/core';
import CheckedInput from 'components/CheckedInput';
import { useSnapshot } from 'utils/hooks';
import { checkValidAddress } from 'utils/transaction';

import { txActions, txContext } from '../context';

interface Props {
	setValidRecipient?: (value: boolean) => void;
}

const RecipientInput: FC<Props> = ({ setValidRecipient }) => {
	const { receiver, token, collectible, type } = useSnapshot(txContext).tx;
	const checkRecipient = () => {
		let result;
		if (type === 'Token') {
			if (!token && receiver.length === 0) return;
			result = checkValidAddress(receiver, token?.network as Networks);
		} else {
			if (!collectible && receiver.length === 0) return;
			result = checkValidAddress(receiver, collectible?.network as Networks);
		}

		setValidRecipient && setValidRecipient(result.valid ? true : false);

		return result.message;
	};

	return (
		<CheckedInput
			value={receiver}
			placeholder="Recipient account"
			onChangeText={(receiver) => txActions.update({ receiver })}
			checkFunction={checkRecipient}
		/>
	);
};

export default RecipientInput;
