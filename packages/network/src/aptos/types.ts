export interface AptosCoinPayload {
	from: string;
	to: string;
	amount: number;
	decimals: number;
	token: string;
}

export interface AptosTokenPayload {
	wallessCollectionId: string;
	wallessCollectibleId: string;
	from: string;
	to: string;
	creator: string;
	collectionName: string;
	tokenName: string;
	amount: number;
}

export interface AptosDirectTransferPayload {
	pubkey: string;
	directTransfer: boolean;
}

export interface AptosClaimTokenPayload {
	pubkey: string;
	sender: string;
	creator: string;
	collectionName: string;
	name: string;
}
