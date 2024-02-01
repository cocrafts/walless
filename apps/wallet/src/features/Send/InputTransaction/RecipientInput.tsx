import type { FC } from 'react';
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
		let result = {
			valid: false,
			message: '',
		};

		if (receiver) {
			if (type === 'Token' && token) {
				result = checkValidAddress(receiver, token.network);
			} else if (collectible) {
				result = checkValidAddress(receiver, collectible.network);
			}
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
