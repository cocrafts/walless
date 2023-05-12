import { type ConnectOptions } from '@walless/core';
import { type MessengerCallback } from '@walless/messaging';
import {
	type PublicKeyDocument,
	type TrustedDomainDocument,
} from '@walless/store';
import modules, { selectors } from 'utils/modules';

export const handleConnect: MessengerCallback = async (payload, channel) => {
	const { onlyIfTrusted, domain } = payload.options as ConnectOptions;

	const domainResponse = await modules.storage.find(selectors.trustedDomains);
	const trustedDomains = domainResponse.docs as TrustedDomainDocument[];

	if (onlyIfTrusted) {
		let isTrusted = true;
		const savedDomain = trustedDomains.find(({ _id }) => _id == domain);
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

	const keyResponse = await modules.storage.find(selectors.allKeys);
	const publicKeys = keyResponse.docs as PublicKeyDocument[];
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
	const newTrustedDomain = await modules.storage.upsert(
		domainName,
		async () => {
			return {
				type: 'TrustedDomain',
				trusted: true,
				timestamp: new Date().toISOString(),
				connectCount: 0,
			};
		},
	);
	console.log('New trust domain: ', newTrustedDomain);
	return true;
};
