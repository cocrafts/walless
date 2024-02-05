import { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import type { TokenDocument } from '@walless/store';
import { throttle } from 'lodash';
import { showError } from 'modals/Error';
import type { JupiterToken } from 'utils/hooks';
import { useSnapshot } from 'utils/hooks';
import { getMappedMint, getSwapQuote } from 'utils/transaction';

import type { SwapContext } from '../context';
import { swapActions, swapContext } from '../context';

import SelectButton from './SelectButton';

const ToToken = () => {
	const { fromToken, toToken, amount, swapQuote } = useSnapshot(swapContext)
		.swap as SwapContext;

	const handleSelectToToken = () => {
		swapActions.openSelectToken('to');
	};

	const outAmount = swapQuote
		? (parseInt(swapQuote.outAmount) * 1.0) / 10 ** (toToken?.decimals || 0)
		: 0;

	const updateSwapQuote = useCallback(
		throttle(
			async (
				fromToken?: TokenDocument,
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
					fromMint: getMappedMint(fromToken),
					toMint: toToken.address,
					amount: amountValue * 10 ** fromToken.account.decimals,
				});
				if (!swapQuote) {
					showError(
						{ errorText: 'Can not swap these tokens, try another one' },
						1500,
					);
				} else {
					swapActions.update({ swapQuote });
				}
			},
			1000,
		),
		[],
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
		justifyContent: 'space-between',
	},
	outAmount: {
		fontSize: 30,
		color: '#FFFFFF',
	},
});
