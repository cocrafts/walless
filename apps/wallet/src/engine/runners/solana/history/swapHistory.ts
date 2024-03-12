import type { Event, Provider } from '@coral-xyz/anchor';
import { BorshCoder, Program, utils } from '@coral-xyz/anchor';
import type { ParsedTransaction, ParsedTransactionMeta } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';

import type { PartialInstruction, RoutePlan, SwapEvent } from '../types';

import type { Jupiter } from './jupiter';
import { IDL } from './jupiter';

export const JUPITER_V6_PROGRAM_ID =
	'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4';

export const extractSwapBalance = (
	transaction: ParsedTransaction,
	meta: ParsedTransactionMeta,
) => {
	const JUPITER_V6_PROGRAM_KEY = new PublicKey(JUPITER_V6_PROGRAM_ID);
	const program = new Program<Jupiter>(
		IDL,
		JUPITER_V6_PROGRAM_KEY,
		{} as Provider,
	);

	const parsedInstructions: PartialInstruction[] = [];
	transaction.message.instructions.forEach((instruction) => {
		if (instruction.programId.equals(JUPITER_V6_PROGRAM_KEY)) {
			parsedInstructions.push(instruction as never);
		}
	});

	meta.innerInstructions?.forEach((instruction) => {
		instruction.instructions.forEach((ix) => {
			if (ix.programId.equals(JUPITER_V6_PROGRAM_KEY)) {
				parsedInstructions.push(ix as never);
			}
		});
	});

	const borshCoder = new BorshCoder(IDL);
	const isRouting = (name: string) => {
		return (
			name === 'route' ||
			name === 'routeWithTokenLedger' ||
			name === 'sharedAccountsRoute' ||
			name === 'sharedAccountsRouteWithTokenLedger' ||
			name === 'sharedAccountsExactOutRoute' ||
			name === 'exactOutRoute'
		);
	};

	const initialPositions: number[] = [];
	const finalPositions: number[] = [];
	for (const instruction of parsedInstructions) {
		if (!instruction.programId.equals(JUPITER_V6_PROGRAM_KEY)) continue;

		const ix = borshCoder.instruction.decode(instruction.data, 'base58');

		if (!ix) continue;

		if (isRouting(ix.name)) {
			const routePlan =
				'routePlan' in ix.data ? (ix.data.routePlan as RoutePlan) : [];
			const inputIndex = 0;
			const outputIndex = routePlan.length;

			for (let i = 0; i < routePlan.length; i++) {
				if (routePlan[i].inputIndex === inputIndex) {
					initialPositions.push(i);
				}
			}

			for (let i = 0; i < routePlan.length; i++) {
				if (routePlan[i].outputIndex === outputIndex) {
					finalPositions.push(i);
				}
			}
		}
	}

	const events: Event[] = [];
	meta?.innerInstructions?.forEach((ix) => {
		ix.instructions.forEach((iix) => {
			if (!iix.programId.equals(JUPITER_V6_PROGRAM_KEY)) return;
			if (!('data' in iix)) return;

			const ixData = utils.bytes.bs58.decode(iix.data);
			const eventData = utils.bytes.base64.encode(ixData.subarray(8));
			const event = program.coder.events.decode(eventData);

			if (!event) return;
			events.push(event);
		});
	});

	const swapData = events.reduce((acc, event) => {
		if (event.name === 'SwapEvent') {
			acc.push(event.data as SwapEvent);
		}

		return acc;
	}, [] as SwapEvent[]);

	return {
		receivedTokenMint: swapData[finalPositions[0]]?.outputMint.toString(),
		receivedTokenAmount: swapData[finalPositions[0]]?.outputAmount.toNumber(),
		sentTokenMint: swapData[initialPositions[0]]?.inputMint.toString(),
		sentTokenAmount: swapData[initialPositions[0]]?.inputAmount.toNumber(),
	};
};
