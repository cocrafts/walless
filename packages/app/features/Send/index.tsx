import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';

import type { ModalContext } from './SendModal';
import SendModal from './SendModal';

export const showSendModal = (configs?: ModalContext) => {
	modalActions.show({
		id: 'send-token',
		bindingDirection: BindDirections.InnerBottom,
		animateDirection: AnimateDirections.Top,
		component: SendModal,
		context: {
			layoutNetwork: configs?.layoutNetwork,
			collectible: configs?.collectible,
		},
	});
};

export * from './SendFeature';
