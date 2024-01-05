import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';
import { ErrorModal, MODAL } from 'modals';

export const showError = (errorText: string) => {
	modalActions.show({
		id: MODAL.ERROR,
		bindingDirection: BindDirections.InnerTop,
		component: ErrorModal,
		animateDirection: AnimateDirections.Bottom,
		withoutMask: true,
		context: {
			errorText: errorText,
		},
	});

	setTimeout(() => {
		modalActions.hide(MODAL.ERROR);
	}, 1000);
};
