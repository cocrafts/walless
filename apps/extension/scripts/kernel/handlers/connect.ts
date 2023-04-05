import { ConnectOptions } from '@walless/core';
import { MessengerCallback } from '@walless/messaging';

import { db } from '../storage';

export const handleConnect: MessengerCallback = async (payload, channel) => {
	const { onlyIfTrusted, domain } = payload.options as ConnectOptions;

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
	console.log('All public keys: ', publicKeys);

	console.log('send back response:', publicKeys);
	channel.postMessage({
		from: 'walless@kernel',
		requestId: payload.requestId,
		publicKeys: publicKeys,
	});
};

const triggerRequireTrustedDomain = async (domainName: string) => {
	// Temporary trigger method for simulate user action to trust any site
	const newTrustedDomain = await db.trustedDomains.add({
		id: domainName,
		domainName: domainName,
		trusted: true,
		timestamp: new Date(),
		connectCount: 0,
	});
	console.log('New trust domain: ', newTrustedDomain);
	return true;
};
