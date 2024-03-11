import type {
	Networks,
	NftV2,
	SolanaCollectible,
	SolanaToken,
	TokenV2,
} from '@walless/core';
import type { NftDocumentV2, TokenDocumentV2 } from '@walless/store';

export type SendTransaction = {
	type: 'token' | 'nft';
	network: Networks;
	sender: string;
	receiver: string;
	amount: number;
};

export type SendTokenTransaction<T extends TokenV2 = TokenV2> =
	SendTransaction & {
		token: TokenDocumentV2<T>;
	};

export type SendNftTransaction<N extends NftV2 = NftV2> = SendTransaction & {
	nft: NftDocumentV2<N>;
};

export type GasilonSupportedTransaction<T extends TokenV2 = TokenV2> = {
	fee: number;
	tokenForFee: TokenDocumentV2<T>;
};

export type SolanaSendTransaction =
	| SolanaSendTokenTransaction
	| SolanaSendNftTransaction;

export type SolanaSendTokenTransaction = SendTokenTransaction<SolanaToken> &
	GasilonSupportedTransaction<SolanaToken>;

export type SolanaSendNftTransaction = SendNftTransaction<SolanaCollectible> &
	GasilonSupportedTransaction<SolanaToken>;
