import type { FC } from 'react';

import { notify } from './modal';

export const copy = async (value: string, prefix: FC) => {
	await navigator.clipboard.writeText(value);

	notify('copied', {
		prefix,
		message: 'Copied',
	});
};
