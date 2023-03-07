import { Connection, JsonRpcProvider } from '@mysten/sui.js';

import { Token, TokenType } from './network-interface';

const connection = new Connection({
	fullnode: 'https://fullnode.devnet.sui.io',
	faucet: 'https://faucet.devnet.sui.io/gas',
});

// connect to a custom RPC server
export const provider = new JsonRpcProvider(connection);

class SuiNet {
	static queryAllByAddress = async (address: string) => {
		const coins = await provider.getAllCoins(address);
		const balance: number = coins.data.reduce((accumulator, coin) => {
			return accumulator + coin.balance;
		}, 0);
		const SUI_COIN_STRING = '0x2::sui::SUI';
		const metadata = await provider.getCoinMetadata(SUI_COIN_STRING);
		console.log(metadata);

		const result: Token = {
			name: metadata.name,
			balance: (balance / 10 ** metadata.decimals).toString(),
			symbol: metadata.symbol,
			type: TokenType.SUI_TOKEN,
		};

		return result;
	};
}

export default SuiNet;
