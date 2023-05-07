import { SlideOption } from '@walless/gui';

import InformationInput from './InformationInput';
import PasscodeInput from './PasscodeInput';
import TransactionConfirmation from './TransactionConfirmation';
import TransactionResult from './TransactionResult';

export const sendScreens: SlideOption[] = [
	{
		id: 'InformationInput',
		component: InformationInput,
	},
	{
		id: 'PasscodeInput',
		component: PasscodeInput,
	},
	{
		id: 'TransactionConfirmation',
		component: TransactionConfirmation,
	},
	{
		id: 'TransactionResult',
		component: TransactionResult,
	},
];
