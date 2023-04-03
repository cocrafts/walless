import { ConnectOptions } from '@walless/core';
import { MessengerCallback } from '@walless/messaging';

import { db } from '../storage';

export const handleConnect: MessengerCallback = async (payload, channel) => {
	const { onlyIfTrusted, domain } = payload.options as ConnectOptions;

	console.log('connect option:', onlyIfTrusted, domain);

	const trustedDomains = await db.trustedDomains.toArray();

	if (onlyIfTrusted) {
		let isTrusted = true;
		const savedDomain = trustedDomains.find((i) => i.domainName == domain);
		if (savedDomain) {
			if (!savedDomain.trusted) isTrusted = false;
		} else {
			isTrusted = await triggerRequireTrustedDomain(domain as string);
		}

		if (!isTrusted) {
			return console.log(
				`handle connect: Domain name ${domain} is not trusted`,
			);
		}
	}

	const publicKeys = await db.publicKeys.toArray();
	const solKey = publicKeys.find((i) => i.network === 'solana');

	if (!solKey) {
		return console.log('handle connect: Public key not found');
	}

	console.log('send back response:', solKey.id);
	channel.postMessage({
		from: 'walless@kernel',
		requestId: payload.requestId,
		publicKey: solKey.id,
	});
};

const triggerRequireTrustedDomain = async (domainName: string) => {
	// Temporary trigger method for simulate user action to trust any site
	console.log(domainName);
	return true;
};
