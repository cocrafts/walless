import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	ActivityIndicator,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import type { SolanaToken } from '@walless/core';
import { BindDirections, modalActions, Text, View } from '@walless/gui';
import { ChevronDown, Exclamation } from '@walless/icons';
import type { TokenDocumentV2 } from '@walless/store';
import type { SolanaTransactionContext } from 'features/Send/internal';
import { txActions, useTransactionContext } from 'features/Send/internal';
import { solMint } from 'utils/constants';
import { useGasilon, useTokens } from 'utils/hooks';

import TokenFeeDropDown from './TokenFeeDropDown';

export const GasilonTransactionFee: FC = () => {
	const {
		type,
		token,
		nft,
		feeAmount,
		feeLoading,
		amount,
		tokenForFee,
		network,
		receiver,
	} = useTransactionContext<SolanaTransactionContext>();

	const tokens = useTokens(network).tokens as TokenDocumentV2<SolanaToken>[];
	const solToken = tokens.find((t) => t.mint === solMint);
	const gasilonTokens = useGasilon(tokens);

	const feeTokens = useMemo(() => {
		if (solToken) return [solToken, ...gasilonTokens];
		else return gasilonTokens;
	}, [solToken, gasilonTokens]);

	const chosenToken = type === 'token' ? token : nft;
	const enableSelectFee = chosenToken?.mint !== solMint && feeTokens.length > 1;

	const [error, setError] = useState('');

	const dropdownRef = useRef(null);

	const handlePressSelect = () => {
		if (!enableSelectFee) return;
		modalActions.show({
			id: 'NetworkFee',
			component: () => (
				<TokenFeeDropDown
					tokens={feeTokens}
					onSelect={(token) => txActions.update({ tokenForFee: token })}
					selectedToken={tokenForFee}
				/>
			),
			bindingRef: dropdownRef,
			bindingDirection: BindDirections.Bottom,
			maskActiveOpacity: 0,
			positionOffset: { y: 4 },
		});
	};

	useEffect(() => {
		txActions.updateTransactionFee();
	}, [type, network, token, nft, tokenForFee, receiver]);

	useEffect(() => {
		if (!token || !tokenForFee || !feeAmount) return;

		let isNotEnoughToken = false;
		if (token._id === tokenForFee._id && tokenForFee.mint !== solMint) {
			const sendAmount = parseFloat(amount);
			isNotEnoughToken = tokenForFee.balance < feeAmount + sendAmount;
		} else {
			isNotEnoughToken = tokenForFee.balance < feeAmount;
		}

		if (isNotEnoughToken) {
			const tokenName = tokenForFee.symbol ?? 'Unknown';
			const errorText = `Not enough ${tokenName}, select other token`;
			setError(errorText);
		} else {
			setError('');
		}
	}, [tokenForFee, token, amount, feeAmount]);

	useEffect(() => {
		if (chosenToken && chosenToken.mint === solMint) {
			txActions.update({ tokenForFee: tokens[0] });
		}
	}, [chosenToken]);

	return (
		<View>
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Exclamation color="#566674" size={10} />
					<Text style={styles.titleText}>Transaction fee</Text>
				</View>

				<View style={styles.valueContainer}>
					{feeLoading ? (
						<ActivityIndicator size="small" color="#FFFFFF" />
					) : (
						<Text style={[styles.feeText, !!error && { color: '#FC9B0A' }]}>
							{parseFloat(feeAmount?.toPrecision(7) || '0')}
						</Text>
					)}
					{chosenToken && (
						<TouchableOpacity
							ref={dropdownRef}
							style={styles.feeDisplay}
							onPress={handlePressSelect}
						>
							<View style={styles.selectContainer}>
								<Image
									style={styles.tokenIcon}
									source={{ uri: tokenForFee?.image }}
								/>
								<Text numberOfLines={1} style={styles.selectedToken}>
									{tokenForFee?.name}
								</Text>
							</View>

							{enableSelectFee && <ChevronDown size={20} color="#566674" />}
						</TouchableOpacity>
					)}
				</View>
			</View>
			<Text style={styles.error}>{error}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	titleText: {
		fontWeight: '500',
		fontSize: 14,
		color: '#566674',
	},
	valueContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	feeText: {
		fontWeight: '500',
		fontSize: 14,
		color: '#FFFFFF',
	},
	feeDisplay: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#1E2830',
		borderRadius: 8,
		paddingHorizontal: 8,
		paddingVertical: 6,
		width: 100,
	},
	selectContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		overflow: 'hidden',
		width: 72,
	},
	tokenIcon: {
		width: 12,
		height: 12,
		borderRadius: 12,
	},
	selectedToken: {
		color: '#ffffff',
		lineHeight: 20,
	},
	error: {
		color: '#FC9B0A',
		alignSelf: 'flex-end',
		marginTop: 6,
	},
});
