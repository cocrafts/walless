import type { CoinStruct } from '@mysten/sui.js/dist/cjs/client';
import type {
	Networks,
	Nft,
	SolanaCollectible,
	SolanaToken,
	SuiToken,
	TezosToken,
	Token,
} from '@walless/core';
import type { NftDocument, TokenDocument } from '@walless/store';

export type SendTransaction = {
	type: 'token' | 'nft';
	network: Networks;
	sender: string;
	receiver: string;
	amount: number;
};

export type SendTokenTransaction<T extends Token = Token> = SendTransaction & {
	token: TokenDocument<T>;
};

export type SendNftTransaction<N extends Nft = Nft> = SendTransaction & {
	nft: NftDocument<N>;
};

export type GasilonSupportedTransaction<T extends Token = Token> = {
	fee: number;
	tokenForFee: TokenDocument<T>;
};

export type SolanaSendTransaction =
	| SolanaSendTokenTransaction
	| SolanaSendNftTransaction;

export type SolanaSendTokenTransaction = SendTokenTransaction<SolanaToken> &
	GasilonSupportedTransaction<SolanaToken>;

export type SolanaSendNftTransaction = SendNftTransaction<SolanaCollectible> &
	GasilonSupportedTransaction<SolanaToken>;

export type SuiTransactionInput = {
	coins: CoinStruct[];
	coinsForFee: CoinStruct[];
	amount: number;
	sender: string;
	receiver: string;
};

export type SuiSendTokenTransaction = SendTokenTransaction<SuiToken> &
	SuiTransactionInput & {
		tokenForFee: TokenDocument<SuiToken>;
	};

export type SuiSendTransaction = SuiSendTokenTransaction;

export type TezosSendTokenTransaction = SendTokenTransaction<TezosToken>;
