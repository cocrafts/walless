import { inspect } from 'util';

import type { NftWithToken, SftWithToken } from '@metaplex-foundation/js';
import { Metaplex } from '@metaplex-foundation/js';
import type {
	AccountInfo,
	Commitment,
	Connection,
	ParsedAccountData,
} from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { Endpoint } from '@walless/core';
import { logger } from '@walless/core';
import { solMint } from 'utils/constants';
import {
	addTokenToStorage,
	getCollectibleByIdFromStorage,
	getTokenByIdFromStorage,
	updateCollectibleAmountToStorage,
	updateTokenBalanceToStorage,
} from 'utils/storage';

import {
	constructCollectibleDocument,
	updateCollectibleToStorage,
} from './collectibles';
import { initTokenDocumentWithMetadata } from './tokens';
import type { ParsedTokenAccountWithAddress } from './types';

/**
 * All cases we need to subscribe
 * - Send, receive native token
 * - Send SPL token, NFT to wallet which has ATA for this token
 * - Send SPL token, NFT to wallet which does not have ATA for this token
 * - Receive SPL token, NFT which we have ATA for
 * - Receive SPL token, NFT which we don't have ATA for
 * */

const accountChangeIds: number[] = [];

export const watchAccount = async (
	connection: Connection,
	endpoint: Endpoint,
	wallet: PublicKey,
	tokenAccountAddress: PublicKey,
	commitment: Commitment = 'confirmed',
) => {
	const id = connection.onAccountChange(
		tokenAccountAddress,
		async (info) => {
			console.log('on account change', tokenAccountAddress);
			const isNativeToken = info.data.byteLength === 0;
			if (isNativeToken) {
				handleNativeTokenChange(wallet, info);
			} else {
				handleSPLTokenChange(
					connection,
					endpoint,
					wallet,
					tokenAccountAddress,
					commitment,
				);
			}
		},
		commitment,
	);

	accountChangeIds.push(id);
};

const handleNativeTokenChange = async (
	wallet: PublicKey,
	info: AccountInfo<Buffer>,
) => {
	const newBalance = info.lamports.toString();
	const id = `${wallet.toString()}/token/${solMint}`;
	await updateTokenBalanceToStorage(id, newBalance);
};

const handleSPLTokenChange = async (
	connection: Connection,
	endpoint: Endpoint,
	wallet: PublicKey,
	tokenAccountAddress: PublicKey,
	commitment: Commitment,
) => {
	const accountData = (
		await connection.getParsedAccountInfo(tokenAccountAddress, commitment)
	).value?.data as ParsedAccountData;

	const tokenAccount: ParsedTokenAccountWithAddress = {
		publicKey: wallet,
		...accountData.parsed.info,
	};

	if (tokenAccount.owner !== wallet.toString()) {
		logger.warn(
			`invalid token account ${tokenAccount} with wrong owner ${wallet}`,
		);
		return;
	}
	console.log(inspect(tokenAccount));

	const isToken = tokenAccount.tokenAmount.decimals !== 0;
	if (isToken) {
		const id = `${wallet.toString()}/token/${tokenAccount.mint}`;
		const storedToken = await getTokenByIdFromStorage(id);
		if (storedToken) {
			await updateTokenBalanceToStorage(id, tokenAccount.tokenAmount.amount);
		} else {
			const tokenDocument = await initTokenDocumentWithMetadata(
				connection,
				endpoint,
				tokenAccount,
			);
			await addTokenToStorage(tokenDocument);
		}
	} else {
		const id = `${wallet.toString()}/collectible/${tokenAccount.mint}`;
		const storedCollectible = await getCollectibleByIdFromStorage(id);
		if (storedCollectible) {
			await updateCollectibleAmountToStorage(
				id,
				parseInt(tokenAccount.tokenAmount.amount),
			);
		} else {
			const mpl = new Metaplex(connection);
			const collectible = (await mpl.nfts().findByMint({
				mintAddress: new PublicKey(tokenAccount.mint),
				tokenAddress: tokenAccount.publicKey,
				tokenOwner: wallet,
			})) as SftWithToken | NftWithToken;

			const collectibleDocument = constructCollectibleDocument(
				wallet.toString(),
				collectible,
				endpoint,
			);
			await updateCollectibleToStorage(
				connection,
				endpoint,
				collectibleDocument,
			);
		}
	}
};
