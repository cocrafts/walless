import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import type { SolanaToken, TransactionPayload } from '@walless/core';
import type { Networks } from '@walless/core';
import { BindDirections, modalActions, Text, View } from '@walless/gui';
import { ChevronDown, Exclamation } from '@walless/icons';
import type { TokenDocumentV2 } from '@walless/store';
import type { SolanaTransactionContext } from 'features/Send/internal';
import {
	txActions,
	txContext,
	useTransactionContext,
} from 'features/Send/internal';
import { solMint } from 'utils/constants';
import { useGasilon, useTokens } from 'utils/hooks';

import { getTokenName, requestTransactionFee } from './internal';
import TokenFeeDropDown from './TokenFeeDropDown';

export const AbstractedTransactionFee: FC = () => {
	const {
		type,
		token,
		nft,
		feeAmount,
		receiver,
		sender,
		amount,
		tokenForFee,
		network,
	} = useTransactionContext<SolanaTransactionContext>();
	const tokens = useTokens(network).tokens as TokenDocumentV2<SolanaToken>[];
	const gasilonTokens = useGasilon(tokens);
	const chosenToken = type === 'token' ? token : nft;
	const enableSelectFee =
		chosenToken.mint !== solMint && gasilonTokens.length > 1;

	const [isFeeLoading, setIsFeeLoading] = useState(false);
	const [error, setError] = useState('');

	const dropdownRef = useRef(null);

	const tokenForFeeName = getTokenName(
		tokenForFee as TokenDocumentV2,
		chosenToken?.network,
	);

	const handlePressSelect = () => {
		if (!enableSelectFee) return;
		modalActions.show({
			id: 'NetworkFee',
			component: () => (
				<TokenFeeDropDown
					tokens={gasilonTokens}
					onSelect={(token) => txActions.update({ tokenForFee: token })}
					selectedToken={tokenForFee as TokenDocumentV2}
				/>
			),
			bindingRef: dropdownRef,
			bindingDirection: BindDirections.Bottom,
			maskActiveOpacity: 0,
			positionOffset: { y: 4 },
		});
	};

	useEffect(() => {
		if (!token || !tokenForFee) return;

		let isNotEnoughToken = false;
		if (token._id === tokenForFee._id) {
			const sendAmount = parseFloat(amount);
			isNotEnoughToken = tokenForFee.balance < feeAmount + sendAmount;
		} else {
			isNotEnoughToken = tokenForFee.balance < feeAmount;
		}

		if (isNotEnoughToken) {
			const tokenName = tokenForFee.symbol ?? 'Unknown';
			const errorText = `Not enough ${tokenName}, select other token`;
			setError(errorText);
		}
	}, [tokenForFee, token, amount]);

	useEffect(() => {
		if (chosenToken.mint === solMint) {
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
					{isFeeLoading ? (
						<ActivityIndicator size="small" color="#FFFFFF" />
					) : (
						<Text style={[styles.feeText, !!error && { color: '#FC9B0A' }]}>
							{feeAmount.toPrecision(7)}
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
									source={{ uri: tokenForFee.image }}
								/>
								<Text numberOfLines={1} style={styles.selectedToken}>
									{tokenForFeeName}
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
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 2,
		marginBottom: 'auto',
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
