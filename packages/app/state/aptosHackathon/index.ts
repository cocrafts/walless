import { AptosAccount, CoinClient, FaucetClient, TokenClient } from 'aptos';
import { AptosClient } from 'aptos';
import { proxy } from 'valtio';

const APTOS_NODE = 'https://fullnode.devnet.aptoslabs.com';
const APTOS_FAUCET = 'https://faucet.devnet.aptoslabs.com';

export interface AptosAbstractProfile {
	name: string;
	address: string;
	octas: bigint;
	token: number;
}

export interface AptosTokenId {
	token_data_id: {
		creator: string;
		collection: string;
		name: string;
	};
	property_version: string;
}

export interface AptosHackathonMessage {
	status: 'success' | 'error' | 'loading' | 'none';
	text: string;
}

export interface AptosHackathonState {
	message: AptosHackathonMessage;
	aptosClient: AptosClient;
	faucetClient: FaucetClient;
	coinClient: CoinClient;
	tokenClient: TokenClient;
	collectionName: string;
	tokenName: string;
	tokenId: AptosTokenId;
	alice: AptosAccount;
	aliceProfile: AptosAbstractProfile;
	bob: AptosAccount;
	bobProfile: AptosAbstractProfile;
	wallessPool: AptosAccount;
	wallessPoolProfile: AptosAbstractProfile;
}

const abstractProfileBuilder = (
	name: string,
	account: AptosAccount,
): AptosAbstractProfile => {
	return {
		name: name,
		address: account.address().toShortString(),
		octas: BigInt(0),
		token: 0,
	};
};

const aptosClient = new AptosClient(APTOS_NODE);

const alice = new AptosAccount();
const bob = new AptosAccount();
const wallessPool = new AptosAccount();

const collectionName = 'Walless Demo';
const tokenName = 'Walless Token';

export const aptosHackathonState = proxy<AptosHackathonState>({
	message: {
		status: 'none',
		text: '',
	},
	aptosClient: aptosClient,
	faucetClient: new FaucetClient(APTOS_NODE, APTOS_FAUCET),
	coinClient: new CoinClient(aptosClient),
	tokenClient: new TokenClient(aptosClient),
	collectionName,
	tokenName,
	tokenId: {
		token_data_id: {
			creator: wallessPool.address().hex(),
			collection: collectionName,
			name: tokenName,
		},
		property_version: '0',
	},
	alice,
	aliceProfile: abstractProfileBuilder('Alice', alice),
	bob,
	bobProfile: abstractProfileBuilder('Bob', bob),
	wallessPool,
	wallessPoolProfile: abstractProfileBuilder('Walless Pool', wallessPool),
});
