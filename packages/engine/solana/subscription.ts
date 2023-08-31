import { Metaplex } from '@metaplex-foundation/js';
import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type { AccountInfo, Logs } from '@solana/web3.js';
import { Connection } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { AssetMetadata } from '@walless/core';
import { Networks } from '@walless/core';
import type { TokenInfo } from '@walless/graphql';
import { queries } from '@walless/graphql';
import { solMint } from '@walless/network';
import type { PublicKeyDocument, TokenDocument } from '@walless/store';

import { collectibleActions } from '../state/collectibles';
import { tokenActions, tokenState } from '../state/tokens';
import type { RunnerContext } from '../utils/type';

import { addCollectibleToState } from './collectibles';
import { getSolanaMetadata } from './metadata';

export const initRealTimeSubscription = async (
	context: RunnerContext<Connection>,
	publicKeys: PublicKeyDocument[],
) => {
	const { connection } = context;
	const fastConnection = new Connection(connection.rpcEndpoint, 'confirmed');

	if (publicKeys.length > 0 && publicKeys[0]._id) {
		const ownerPublicKey = new PublicKey(publicKeys[0]._id);

		const parsedTokenAccounts = await connection.getParsedTokenAccountsByOwner(
			ownerPublicKey,
			{
				programId: TOKEN_PROGRAM_ID,
			},
		);

		const accountKeys = [
			ownerPublicKey,
			...parsedTokenAccounts.value.map((ata) => ata.pubkey),
		];

		accountKeys.forEach(async (key) => {
			fastConnection.onAccountChange(key, (info) =>
				handleAccountChange(context, ownerPublicKey, info),
			);
		});

		fastConnection.onLogs(ownerPublicKey, (logs) => {
			handleLogsChange(context, ownerPublicKey, logs);
		});
	}
};

const handleAccountChange = async (
	{ connection, endpoint }: RunnerContext<Connection>,
	address: PublicKey,
	info: AccountInfo<Buffer>,
) => {
	const keyStr = address.toString();
	let mint: string;
	let balance: string;

	const isNativeSOL = info.data.byteLength === 0;
	if (isNativeSOL) {
		mint = solMint;
		balance = info.lamports.toString();
	} else {
		const data = AccountLayout.decode(info.data);
		mint = data.mint.toString();
		balance = data.amount.toString();
	}

	const id = `${keyStr}/${mint}`;
	if (!tokenActions.updateBalance(id, balance)) {
		const amount = parseInt(balance);
		if (!collectibleActions.updateCollectibleAmount(id, amount)) {
			const mpl = new Metaplex(connection);
			try {
				const nft = await mpl
					.nfts()
					.findByMint({ mintAddress: new PublicKey(mint) });
				addCollectibleToState(connection, endpoint, keyStr, nft);
			} catch {
				console.log('Not found any token or nft to update', {
					keyStr,
					mint,
					balance,
				});
			}
		}
	}
};

const handleLogsChange = async (
	{ connection, qlClient, storage, endpoint }: RunnerContext<Connection>,
	address: PublicKey,
	logs: Logs,
) => {
	if (
		logs.logs.find((ele) =>
			ele.includes('Initialize the associated token account'),
		)
	) {
		const transaction = await connection.getTransaction(logs.signature, {
			commitment: 'confirmed',
			maxSupportedTransactionVersion: 2,
		});

		const tokenBalances = transaction?.meta?.postTokenBalances?.filter(
			(ele) => ele.owner === address.toJSON(),
		);

		if (tokenBalances) {
			tokenBalances.forEach(async (ele) => {
				if (ele.uiTokenAmount.decimals === 0) {
					const mpl = new Metaplex(connection);
					const nft = await mpl
						.nfts()
						.findByMint({ mintAddress: new PublicKey(ele.mint) });
					addCollectibleToState(connection, endpoint, address.toString(), nft);
				} else {
					let tokens: TokenInfo[] = [];
					let metadata: AssetMetadata | undefined;

					try {
						const { tokensByAddress } = await qlClient.request<
							{ tokensByAddress: TokenInfo[] },
							{ addresses: string[] }
						>(queries.tokensByAddress, {
							addresses: [`${Networks.solana}#${ele.mint}`],
						});

						tokens = tokensByAddress;
					} catch (error) {
						console.log('tokens error', error);
					}

					try {
						metadata = await getSolanaMetadata({
							storage,
							connection,
							mintAddress: ele.mint,
						});
					} catch (error) {
						console.log('metadata error', error);
					}

					const tokenDoc: TokenDocument = {
						_id: `${address.toString()}/${ele.mint}`,
						network: Networks.solana,
						endpoint,
						type: 'Token',
						account: {
							mint: ele.mint,
							owner: ele.owner,
							address: address.toString(),
							balance: ele.uiTokenAmount.amount,
							decimals: ele.uiTokenAmount.decimals,
							quotes: tokens.length > 0 && tokens[0].quotes,
						},
						metadata,
					};

					tokenState.map.set(tokenDoc._id, tokenDoc);
				}
			});
		}
	}
};
