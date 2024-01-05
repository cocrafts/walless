import type { FC } from 'react';
import type { Networks } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';

import ErrorModal from './Error';
import NotificationModal from './Notification';
import ReceiveModal from './Receive';
import type { RemoveLayoutModalConfig } from './RemoveLayout';
import RemoveLayoutModal from './RemoveLayout';
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

const showNotifyModal = (
	id: string,
	content: {
		prefix?: FC;
		message: string;
		suffix?: FC;
	},
	modalConfig?: Omit<ModalConfigs, 'component' | 'context'>,
	time?: 'none' | number,
) => {
	const _id = `notify-${id}`;
	const { prefix, message, suffix } = content;

	modalActions.show({
		id: _id,
		component: NotificationModal,
		fullWidth: false,
		withoutMask: true,
		bindingDirection: BindDirections.InnerTop,
		positionOffset: { y: 16 },
		...modalConfig,
		context: {
			prefix,
			message,
			suffix,
		},
	});

	if (time !== 'none') {
		setTimeout(() => {
			modalActions.hide(_id);
		}, time || 1000);
	}
};

const showRemoveLayoutModal = (config: RemoveLayoutModalConfig) => {
	modalActions.show({
		id: MODAL.REMOVE_LAYOUT,
		component: RemoveLayoutModal,
		context: config,
		bindingDirection: BindDirections.Right,
		animateDirection: AnimateDirections.Right,
		positionOffset: {
			y: config.orbSize / 2,
		},
		bindingRef: config.bindingRef,
	});
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
		context: config,
	});
};

export const floatActions = {
	showError,
	showNotifyModal,
	showRemoveLayoutModal,
	showSendTokenModal,
	showReceiveModal,
	showRequirePasscodeModal,
};
