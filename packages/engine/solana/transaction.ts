import type { ParsedInstruction } from '@solana/web3.js';
import type { Collectible, Token } from '@walless/core';
import { Networks } from '@walless/core';

import { tokenAmount } from './../../../apps/web/src/screens/Profile/modals/internal';

export interface Transaction {
	signature: string;
	sender: string;
	receiver: string;
	token: Omit<Token, 'account'> | Omit<Collectible, 'account'>;
	amount: number;
	date: Date;
	time: string;
}

export const handleGetTransactionDetails = (instruction: ParsedInstruction) => {
	let transaction: Transaction;
	if (instruction.program === 'system') {
		const token: Omit<Token, 'account'> = {
			network: Networks.solana,
			metadata: {
				name: instruction.parsed.info.name,
				symbol: instruction.parsed.info.symbol,
			},
		};

		transaction = {
			signature: '',
			sender: instruction.parsed.info.source,
			receiver: instruction.parsed.info.destination,
			token: token,
			amount:
				instruction.parsed.info.tokenAmount.amount /
				instruction.parsed.info.tokenAmount.decimals,
			
		};
	} else if (instruction.program === 'spl-token') {
	} else if (instruction.program === 'spl-associated-token-account') {
	}
};
