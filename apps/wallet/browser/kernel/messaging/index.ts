import { createMessenger } from '@walless/messaging';

import { onKernelMessage } from '../handlers/kernel';

/* quite similar to Browser/PWA version,
 * but Mobile messaging talk to itself, no encryption ever needed! */
export const initializeMessaging = async (): Promise<void> => {
	const messenger = createMessenger();
	messenger.onMessage('kernel', onKernelMessage);
};
