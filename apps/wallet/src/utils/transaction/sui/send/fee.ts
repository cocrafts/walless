import type { GasCostSummary } from '@mysten/sui.js/client';
import type { TransactionBlock } from '@mysten/sui.js/transactions';
import { SUI_DECIMALS } from '@mysten/sui.js/utils';
import { Networks } from '@walless/core';
import { engine } from 'engine';
import type { SuiContext } from 'engine/runners';

const calculateSuiGas = (gas: GasCostSummary): number => {
	const gasBigInt =
		BigInt(gas.computationCost) +
		BigInt(gas.storageCost) -
		BigInt(gas.storageRebate);
	return Number(gasBigInt) / 10 ** SUI_DECIMALS;
};

export const getSuiTransactionFee = async (txb: TransactionBlock) => {
	const { client } = engine.getContext<SuiContext>(Networks.sui);
	const builtTxb = await txb.build({ client }).catch(console.log);
	if (!builtTxb) throw new Error('unable to build txb');
	const dryrunResult = await client.dryRunTransactionBlock({
		transactionBlock: builtTxb,
	});

	return calculateSuiGas(dryrunResult?.effects.gasUsed);
};
