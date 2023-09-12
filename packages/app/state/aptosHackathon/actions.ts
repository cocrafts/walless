import type { AptosAccount, AptosClient, TokenClient } from 'aptos';

import type { AptosHackathonMessage, AptosTokenId } from '.';
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
	updateMessage: (message: AptosHackathonMessage) => {
		aptosHackathonState.message = message;
	},

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

		try {
			aptosHackathonActions.updateMessage({
				status: 'loading',
				text: 'Funding accounts...',
			});

			await faucetClient.fundAccount(alice.address(), 0);
			await faucetClient.fundAccount(bob.address(), 5_000_000);
			await faucetClient.fundAccount(wallessPool.address(), 100_000_000);
			aliceProfile.octas = await getBalance(aptosClient, alice);
			bobProfile.octas = await getBalance(aptosClient, bob);
			wallessPoolProfile.octas = await getBalance(aptosClient, wallessPool);

			aptosHackathonActions.updateMessage({
				status: 'success',
				text: 'Funded bob and walless pool',
			});
		} catch (error) {
			aptosHackathonActions.updateMessage({
				status: 'error',
				text: `${error}`,
			});
		}

		try {
			aptosHackathonActions.updateMessage({
				status: 'loading',
				text: 'Creating walless collection...',
			});

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

			aptosHackathonActions.updateMessage({
				status: 'success',
				text: 'Created walless collection',
			});
		} catch (error) {
			aptosHackathonActions.updateMessage({
				status: 'error',
				text: 'Error creating collection' + error,
			});
		}

		try {
			aptosHackathonActions.updateMessage({
				status: 'loading',
				text: 'Creating walless token...',
			});

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

			aptosHackathonActions.updateMessage({
				status: 'success',
				text: 'Created walless token',
			});
		} catch (error) {
			aptosHackathonActions.updateMessage({
				status: 'error',
				text: `${error}`,
			});
		}

		aptosHackathonActions.updateMessage({
			status: 'loading',
			text: 'Walless Pool minting walless token...',
		});
		wallessPoolProfile.token = await getToken(
			tokenClient,
			wallessPool,
			tokenId,
		);
		aptosHackathonActions.updateMessage({
			status: 'success',
			text: 'Walless Pool minted walless token',
		});

		try {
			aptosHackathonActions.updateMessage({
				status: 'loading',
				text: 'Alice minting walless token...',
			});
			const transferTokenTxHash = await tokenClient.directTransferToken(
				wallessPool,
				alice,
				wallessPool.address().hex(),
				collectionName,
				tokenName,
				500,
			);

			await aptosClient.waitForTransactionWithResult(transferTokenTxHash, {
				checkSuccess: true,
			});

			wallessPoolProfile.octas = await getBalance(aptosClient, wallessPool);
			wallessPoolProfile.token = await getToken(
				tokenClient,
				wallessPool,
				tokenId,
			);
			aliceProfile.octas = await getBalance(aptosClient, alice);
			aliceProfile.token = await getToken(tokenClient, alice, tokenId);

			aptosHackathonActions.updateMessage({
				status: 'success',
				text: 'Alice minted walless token',
			});
		} catch (error) {
			aptosHackathonActions.updateMessage({
				status: 'error',
				text: `${error}`,
			});
		}
	},
};
