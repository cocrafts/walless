import type { Networks } from '@walless/core';
import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';

import ErrorModal from './Error';
import ReceiveModal from './Receive';
import type { RequirePasscodeModalConfig } from './RequirePasscode';
import RequirePasscodeModal from './RequirePasscode';
import type { ModalContext } from './SendToken';
import SendModal from './SendToken';

enum MODAL {
	ERROR = 'Error',
	NOTIFICATION = 'Notification',
	RECEIVE = 'Receive',
	REMOVE_LAYOUT = 'RemoveLayout',
	REQUIRE_PASSCODE = 'RequirePasscode',
	SEND = 'Send',
}

const showError = (errorText: string) => {
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

const showSendTokenModal = (configs?: ModalContext) => {
	modalActions.show({
		id: MODAL.SEND,
		bindingDirection: BindDirections.InnerBottom,
		animateDirection: AnimateDirections.Top,
		component: SendModal,
		context: {
			layoutNetwork: configs?.layoutNetwork,
			collectible: configs?.collectible,
		},
	});
};

const showReceiveModal = (layoutNetWork?: Networks) => {
	modalActions.show({
		id: MODAL.RECEIVE,
		bindingDirection: BindDirections.InnerBottom,
		animateDirection: AnimateDirections.Top,
		component: ReceiveModal,
		context: {
			network: layoutNetWork,
		},
	});
};

const showRequirePasscodeModal = (config: RequirePasscodeModalConfig) => {
	modalActions.show({
		id: MODAL.REQUIRE_PASSCODE,
		bindingDirection: BindDirections.InnerBottom,
		component: RequirePasscodeModal,
		context: {
			title: config.title,
			desc: config.desc,
			onPasscodeComplete: config.onPasscodeComplete,
			onActionComplete: config.onActionComplete,
		},
	});
};

export const floatActions = {
	showError,
	showSendTokenModal,
	showReceiveModal,
	showRequirePasscodeModal,
};
