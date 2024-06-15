import { logger } from '@walless/core';
import type { Account } from '@walless/graphql';
import { mutations } from '@walless/graphql';
import BN from 'bn.js';
import { qlClient } from 'utils/graphql';

import { tkey } from './w3a';

export const initAndRegisterWallet = async (): Promise<Account | undefined> => {
	try {
		await tkey.reconstructKey();
		const newShare = await tkey.generateNewShare();
		const keyIndex = newShare.newShareIndex.toString('hex');
		const recoveryBN = newShare.newShareStores[keyIndex].share.share;
		const readableKey = toReadableString(recoveryBN);
		const { registerAccount: account } = await qlClient.request<
			{ registerAccount: Account },
			{ key: string }
		>(mutations.registerAccount, {
			key: readableKey,
		});

		return account;
	} catch (e) {
		logger.error('Failed to init and register wallet:', e);
	}
};

export const recoverByEmergencyKey = async (readableKey: string) => {
	try {
		const recoveryBN = fromReadableString(readableKey);

		await tkey.inputShare(recoveryBN);
		await tkey.reconstructKey();

		return true;
	} catch (e) {
		logger.error('Failed to recover by emergency key', e);
		return false;
	}
};

const baseChars = '0123456789abcdefghijklmnopqrstuvwxyz';

const bnToCustomBase = (value: BN): string => {
	if (value.isZero()) {
		return baseChars[0];
	}

	let result = '';
	const base = new BN(baseChars.length);

	while (!value.isZero()) {
		const remainder = value.mod(base);
		result = baseChars[remainder.toNumber()] + result;
		value = value.div(base);
	}

	return result;
};

const customBaseToBN = (value: string) => {
	const base = new BN(baseChars.length);
	let result = new BN(0);

	for (let i = 0; i < value.length; i++) {
		const charIndex = baseChars.indexOf(value[i]);
		if (charIndex === -1) {
			throw new Error(`Invalid character '${value[i]}' in custom base value`);
		}
		result = result.mul(base).add(new BN(charIndex));
	}

	return result;
};

const toReadableString = (value: BN): string => {
	const base = bnToCustomBase(value).toUpperCase();
	const groups = base.match(/.{1,6}/g) || [];

	return reverse(groups.join('-'));
};

const fromReadableString = (readable: string) => {
	const original = reverse(readable).toLowerCase().replace(/-/g, '');

	return customBaseToBN(original);
};

const reverse = (source: string) => {
	return source.split('').reduce((a, c) => c + a, '');
};
