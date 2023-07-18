import { type Walless } from '@walless/sdk';

declare const window: Window & {
	walless: Walless;
};

export const installLayout = async (id: string) => {
	return await window.walless.installLayout(id);
};
