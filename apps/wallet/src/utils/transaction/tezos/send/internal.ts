import type { TezosToolkit } from '@taquito/taquito';
import { OpKind } from '@taquito/taquito';
import { TezosTokenTypes } from '@walless/core';
import { XTZ } from 'engine/runners/tezos/token';
import type { TezosSendTokenTransaction } from 'utils/transaction/types';

export const getTransferParams = async (
	{
		sender,
		receiver,
		amount,
		token,
	}: Omit<TezosSendTokenTransaction, 'network' | 'type'>,
	connection: TezosToolkit,
) => {
	if (token.contract.address === XTZ.contract.address) {
		return {
			amount: amount,
			to: receiver,
		};
	}

	const contract = await connection.contract.at(token.contract.address);

	if (token.tokenType === TezosTokenTypes.FA2) {
		return {
			kind: OpKind.TRANSACTION,
			to: contract.address,
			amount: 0,
			parameter: {
				entrypoint: 'transfer',
				value: [
					{
						prim: 'Pair',
						args: [
							{ string: sender },
							[
								{
									prim: 'Pair',
									args: [
										{ string: receiver },
										{
											prim: 'Pair',
											args: [
												{ int: token.tokenId },
												{ int: (amount * 10 ** token.decimals).toFixed() },
											],
										},
									],
								},
							],
						],
					},
				],
			},
		};
	}

	return contract.methods
		.transfer(sender, receiver, amount * 10 ** token.decimals)
		.toTransferParams();
};
