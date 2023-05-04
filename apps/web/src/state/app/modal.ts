import { FC } from 'react';
import { NotificationModal } from '@walless/app';
import { Networks } from '@walless/core';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	ModalConfigs,
} from '@walless/gui';
import ReceiveTokenScreen from 'screens/Profile/modals/ReceiveToken';
import SendTokenScreen from 'screens/Profile/modals/SendToken';

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

export const showSendModal = (layoutNetwork?: Networks) => {
	modalActions.show({
		id: 'send-token',
		bindingDirection: BindDirections.InnerBottom,
		component: SendTokenScreen,
		animateDirection: AnimateDirections.Top,
		context: {
			currentNetwork: layoutNetwork,
		},
	});
};

export const notify = (
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
		maskActiveOpacity: 0,
		bindingDirection: BindDirections.InnerTop,
		positionOffset: { y: 20 },
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
