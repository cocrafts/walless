import { Networks } from '@walless/core';
import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';
import ReceiveTokenScreen from 'screens/Profile/modals/ReceiveToken';

export const showReceiveModal = (layoutNetWork: Networks) => {
	modalActions.show({
		id: 'receive-token',
		bindingDirection: BindDirections.InnerBottom,
		component: ReceiveTokenScreen,
		animateDirection: AnimateDirections.Top,
		context: {
			network: layoutNetWork,
		},
	});
};
