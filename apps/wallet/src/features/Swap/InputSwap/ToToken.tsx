import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { SolanaToken } from '@walless/core';
import { Text, View } from '@walless/gui';
import type { TokenDocument } from '@walless/store';
import { useDebouncedCallback } from 'use-debounce';
import { parseWithDecimals } from 'utils/format';
import type { JupiterToken } from 'utils/hooks';
import { useSnapshot } from 'utils/hooks';
import { getAliasedMint, getSwapQuote } from 'utils/transaction/solana/swap';

import type { SwapContext } from '../context';
import { swapActions, swapContext } from '../context';

import SelectButton from './SelectButton';

const ToToken = () => {
	const { fromToken, toToken, amount, swapQuote } = useSnapshot(swapContext)
		.swap as SwapContext;

	const handleSelectToToken = () => {
		swapActions.openSelectToken('to');
	};

	const outAmount =
		swapQuote && toToken
			? parseWithDecimals(swapQuote.outAmount, toToken.decimals)
			: 0;

	const updateSwapQuote = useDebouncedCallback(
		async (
			fromToken?: TokenDocument<SolanaToken>,
			toToken?: JupiterToken,
			amount?: string,
		) => {
			if (!fromToken || !toToken || !amount) {
				swapActions.update({ swapQuote: undefined });
				return;
			}

			const amountValue = parseFloat(amount);
			if (isNaN(amountValue) || amountValue === 0) {
				swapActions.update({ swapQuote: undefined });
				return;
			}

			const swapQuote = await getSwapQuote({
				fromMint: getAliasedMint(fromToken),
				toMint: toToken.address,
				amount: amountValue * 10 ** fromToken.decimals,
			});
			if (swapQuote) {
				swapActions.update({ swapQuote });
			}
		},
		1000,
	);

	useEffect(() => {
		updateSwapQuote(fromToken, toToken, amount);
	}, [fromToken, toToken, amount]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>To</Text>
			<View style={styles.tokenContainer}>
				<SelectButton
					symbol={toToken?.symbol}
					logoURI={toToken?.logoURI}
					onPress={handleSelectToToken}
				/>
				<Text style={styles.outAmount}>{outAmount}</Text>
			</View>
		</View>
	);
};

export default ToToken;

const styles = StyleSheet.create({
	container: {
		gap: 14,
		paddingBottom: 30,
	},
	title: {
		color: '#FFFFFF',
	},
	tokenContainer: {
		flexDirection: 'row',
		overflow: 'hidden',
		gap: 10,
	},
	outAmount: {
		flex: 1,
		fontSize: 30,
		color: '#FFFFFF',
		textAlign: 'right',
	},
});
