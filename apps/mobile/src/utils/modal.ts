import type { FC } from 'react';
import type { ModalConfigs } from '@walless/gui';
import { BindDirections, modalActions } from '@walless/gui';

import NotificationModal from '../modals/Notification';

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
