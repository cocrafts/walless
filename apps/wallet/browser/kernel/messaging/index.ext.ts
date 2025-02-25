import { ChromeKernel } from '@metacraft/crab/chrome';
import { RequestType } from '@walless/core';
import { Channels } from '@walless/messaging';

import * as common from '../handlers/common';
import * as solana from '../handlers/solana';
import { checkConnection, requestUserSignature } from '../utils/middleware';

export const initializeMessaging = async (): Promise<void> => {
	const kernel = new ChromeKernel<Channels, RequestType>();
	kernel
		.channel(Channels.kernel)
		.handle(RequestType.REQUEST_CONNECT)
		.use(checkConnection(kernel))
		.use(common.connect)
		.handle(RequestType.REQUEST_DISCONNECT)
		.use(common.disconnect)
		.handle(RequestType.SIGN_MESSAGE_ON_SOLANA)
		.use(requestUserSignature(kernel))
		.use(solana.signMessage)

		.channel(Channels.popup)
		.handle(RequestType.REQUEST_PAYLOAD)
		.use(common.requestPayload(kernel))
		.handle(RequestType.REQUEST_CONNECT)
		.use(kernel.handleCrossResolvingMiddleware)
		.handle(RequestType.RESOLVE_REQUEST_SIGNATURE)
		.use(kernel.handleCrossResolvingMiddleware)

		.run();
};
