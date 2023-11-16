import type { Networks } from '@walless/core';
import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';

import ReceiveModal from './ReceiveModal';

export const showReceiveModal = (layoutNetWork: Networks) => {
	modalActions.show({
		id: 'receive-token',
		bindingDirection: BindDirections.InnerBottom,
		animateDirection: AnimateDirections.Top,
		component: ReceiveModal,
		context: {
			network: layoutNetWork,
		},
	});
};

export * from './ReceiveModal';
