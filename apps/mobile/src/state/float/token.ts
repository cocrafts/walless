import type { Networks } from '@walless/core';
import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';
import type { ModalContext } from 'modals';
import { MODAL, ReceiveModal, SendModal } from 'modals';

export const showSendTokenModal = (configs?: ModalContext) => {
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

export const showReceiveModal = (layoutNetWork?: Networks) => {
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
