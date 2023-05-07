import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';

import { ErrorModal } from './ErrorModal';

export const showError = (errorText: string) => {
	modalActions.show({
		id: 'error-modal',
		bindingDirection: BindDirections.InnerTop,
		component: ErrorModal,
		animateDirection: AnimateDirections.Bottom,
		withoutMask: true,
		context: {
			errorText: errorText,
		},
	});

	setTimeout(() => {
		modalActions.hide('error-modal');
	}, 1000);
};
