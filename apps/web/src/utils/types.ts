import type { MessagePayload } from '@walless/messaging';

export interface PayloadOptions {
	sourceRequestId: string;
	isApproved?: boolean;
	passcode?: string;
}

export type PopupPayload = Omit<MessagePayload, 'requestId'> & PayloadOptions;
