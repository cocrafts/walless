import type { AptosAccount, AptosClient, TokenClient } from 'aptos';

import type { AptosTokenId } from '.';
import { aptosHackathonState } from '.';

const getBalance = async (client: AptosClient, account: AptosAccount) => {
	const resources = await client.getAccountResources(account.address().hex());
	const aptosCoin = '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>';
	const accountResource = resources.find((r) => r.type === aptosCoin);
	return BigInt((accountResource!.data as any).coin.value);
};

const getToken = async (
	tokenClient: TokenClient,
	account: AptosAccount,
	tokenId: AptosTokenId,
) => {
	try {
		const token = await tokenClient.getTokenForAccount(
			account.address().hex(),
			tokenId,
		);
		return parseInt(token.amount);
	} catch (error) {
		console.log('--> get token error', error);
		return 0;
	}
};

export const aptosHackathonActions = {
	initDemo: async () => {
		const {
			collectionName,
			tokenName,
			tokenId,
			alice,
			aliceProfile,
			bob,
			bobProfile,
			wallessPool,
			wallessPoolProfile,
			aptosClient,
			faucetClient,
			coinClient,
			tokenClient,
		} = aptosHackathonState;

		await faucetClient.fundAccount(bob.address(), 5_000_000);
		await faucetClient.fundAccount(wallessPool.address(), 100_000_000);
		bobProfile.octas = await getBalance(aptosClient, bob);
		wallessPoolProfile.octas = await getBalance(aptosClient, wallessPool);

		try {
			const createCollectionTxHash = await tokenClient.createCollection(
				wallessPool,
				collectionName,
				'Walless Aptos Hackathon Demo Collection',
				'https://aptos.dev/img/nyan.jpeg',
				100_000_000,
			);
			await aptosClient.waitForTransactionWithResult(createCollectionTxHash, {
				checkSuccess: true,
			});
			wallessPoolProfile.octas = await getBalance(aptosClient, wallessPool);
		} catch (error) {
			console.log('--> create collection error', error);
		}

		try {
			const createTokenTxHash = await tokenClient.createToken(
				wallessPool,
				collectionName,
				tokenName,
				'Walless Aptos Hackathon Demo Token',
				1_000_000,
				'https://aptos.dev/img/nyan.jpeg',
			);
			await aptosClient.waitForTransactionWithResult(createTokenTxHash, {
				checkSuccess: true,
			});
			wallessPoolProfile.octas = await getBalance(aptosClient, wallessPool);
		} catch (error) {
			console.log('--> create token error', error);
		}

		wallessPoolProfile.token = await getToken(
			tokenClient,
			wallessPool,
			tokenId,
		);

		try {
			await tokenClient.directTransferToken(
				wallessPool,
				alice,
				wallessPool.address().hex(),
				collectionName,
				tokenName,
				500,
			);
			wallessPoolProfile.octas = await getBalance(aptosClient, wallessPool);
			wallessPoolProfile.token = await getToken(
				tokenClient,
				wallessPool,
				tokenId,
			);
			aliceProfile.token = await getToken(tokenClient, alice, tokenId);
		} catch (error) {
			console.log(
				'--> direct transfer token from walless pool to alice error',
				error,
			);
		}
	},
};
