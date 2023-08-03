import type { SlideOption } from '@walless/gui';

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
		id: 'TransactionConfirmation',
		component: TransactionConfirmation,
	},
	{
		id: 'PasscodeInput',
		component: PasscodeInput,
	},
	{
		id: 'TransactionResult',
		component: TransactionResult,
	},
];
