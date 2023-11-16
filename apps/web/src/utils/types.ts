import type { PureMessagePayload } from '@walless/messaging';

export interface PayloadOptions {
	sourceRequestId: string;
	isApproved?: boolean;
	passcode?: string;
}

export type PopupPayload = PureMessagePayload & PayloadOptions;
