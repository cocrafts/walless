import type { Networks } from '@walless/core';
import CheckedInput from 'components/CheckedInput';
import { useSnapshot } from 'utils/hooks';
import { checkValidAddress } from 'utils/transaction';

import { txActions, txContext } from '../context';

const RecipientInput = () => {
	const { receiver, token, collectible, type } = useSnapshot(txContext).tx;
	const checkRecipient = () => {
		if (type === 'Token') {
			if (!token && receiver.length === 0) return;
			return checkValidAddress(receiver, token?.network as Networks).message;
		} else {
			if (!collectible && receiver.length === 0) return;
			return checkValidAddress(receiver, collectible?.network as Networks)
				.message;
		}
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
