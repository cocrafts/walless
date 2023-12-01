import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';

import type { ModalContext } from '../../features/Send';
import SendTokenModal from '../../modals/SendToken';

export const showSendTokenModal = (configs?: ModalContext) => {
	modalActions.show({
		id: 'send-token',
		bindingDirection: BindDirections.InnerBottom,
		animateDirection: AnimateDirections.Top,
		component: SendTokenModal,
		context: {
			layoutNetwork: configs?.layoutNetwork,
			collectible: configs?.collectible,
		},
	});
};
