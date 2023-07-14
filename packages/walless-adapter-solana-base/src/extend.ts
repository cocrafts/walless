import { type Walless } from '@walless/sdk';

declare const window: Window & {
	walless: Walless;
};

export const installLayout = async (input: string): Promise<boolean> => {
	return await window.walless.installLayout(input);
};
