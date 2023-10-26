import type { FC } from 'react';
import { NotificationModal } from '@walless/app';
import type { Collectible, Networks } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';

import ReceiveModal from '../modals/ReceiveModal';
import SendModal from '../modals/SendModal';
import RequirePasscodeModal from '../modals/RequirePasscodeModal';
import { ResponseCode } from '@walless/messaging';

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

export interface SendModalConfig {
	layoutNetwork?: Networks;
	collectible?: Collectible;
}

export const showSendModal = (configs?: SendModalConfig) => {
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

interface RequirePasscodeModalConfig {
	title: string;
	desc: string;
	onPasscodeComplete?: (passcode: string) => Promise<{
		responseCode?: ResponseCode | undefined;
		message?: string | undefined;
	}>;
	onActionComplete?: () => void;
}

export const showRequirePasscodeModal = (
	config: RequirePasscodeModalConfig,
) => {
	modalActions.show({
		id: 'require-passcode',
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
