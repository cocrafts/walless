import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';

import type { ErrorModalContext } from './Error';
import ErrorModal from './Error';
import type { NotificationModalContext } from './Notification';
import NotificationModal from './Notification';
import type { ReceiveModalContext } from './Receive';
import ReceiveModal from './Receive';
import type { RemoveLayoutModalContext } from './RemoveLayout';
import RemoveLayoutModal from './RemoveLayout';
import type { RequirePasscodeModalContext } from './RequirePasscode';
import RequirePasscodeModal from './RequirePasscode';
import type { SendModalContext } from './SendToken';
import SendModal from './SendToken';

enum MODAL {
	ERROR = 'Error',
	NOTIFICATION = 'Notification',
	RECEIVE = 'Receive',
	REMOVE_LAYOUT = 'RemoveLayout',
	REQUIRE_PASSCODE = 'RequirePasscode',
	SEND = 'Send',
}

export const showError = (context: ErrorModalContext) => {
	modalActions.show({
		id: MODAL.ERROR,
		bindingDirection: BindDirections.InnerTop,
		component: ErrorModal,
		animateDirection: AnimateDirections.Bottom,
		withoutMask: true,
		context,
	});

	setTimeout(() => {
		modalActions.hide(MODAL.ERROR);
	}, 1000);
};

const showNotificationModal = (context: NotificationModalContext) => {
	const id = `${MODAL.NOTIFICATION}-${context.id}}`;

	modalActions.show({
		id,
		component: NotificationModal,
		fullWidth: false,
		withoutMask: true,
		bindingDirection: BindDirections.InnerTop,
		positionOffset: { y: 16 },
		context,
	});

	if (context.timeout !== undefined) {
		setTimeout(() => {
			modalActions.hide(id);
		}, context.timeout || 1000);
	}
};

const showRemoveLayoutModal = (context: RemoveLayoutModalContext) => {
	modalActions.show({
		id: MODAL.REMOVE_LAYOUT,
		component: RemoveLayoutModal,
		context,
		bindingDirection: BindDirections.Right,
		animateDirection: AnimateDirections.Right,
		positionOffset: {
			y: context.orbSize / 2,
		},
		bindingRef: context.bindingRef,
	});
};

const showSendTokenModal = (context: SendModalContext) => {
	modalActions.show({
		id: MODAL.SEND,
		bindingDirection: BindDirections.InnerBottom,
		animateDirection: AnimateDirections.Top,
		component: SendModal,
		context,
	});
};

const showReceiveModal = (context: ReceiveModalContext) => {
	modalActions.show({
		id: MODAL.RECEIVE,
		bindingDirection: BindDirections.InnerBottom,
		animateDirection: AnimateDirections.Top,
		component: ReceiveModal,
		context,
	});
};

const showRequirePasscodeModal = (context: RequirePasscodeModalContext) => {
	modalActions.show({
		id: MODAL.REQUIRE_PASSCODE,
		bindingDirection: BindDirections.InnerBottom,
		component: RequirePasscodeModal,
		context,
	});
};

export const floatActions = {
	showError,
	showNotificationModal,
	showRemoveLayoutModal,
	showSendTokenModal,
	showReceiveModal,
	showRequirePasscodeModal,
};
