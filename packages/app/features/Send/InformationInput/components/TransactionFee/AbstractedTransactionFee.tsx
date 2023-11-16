import { useEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import type { Token, TransactionPayload } from '@walless/core';
import type { Networks } from '@walless/core';
import { solMint } from '@walless/engine/crawlers/solana/metadata';
import { BindDirections, modalActions, Text, View } from '@walless/gui';
import { ChevronDown, Exclamation } from '@walless/icons';
import type { CollectibleDocument, TokenDocument } from '@walless/store';
import { set } from 'lodash';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../../../state/transaction';

import {
	handleCheckIfBalanceIsEnough,
	handleGetTokenName,
	handleSetTransactionFee,
} from './internal';
import TokenFeeDropDown from './TokenFeeDropDown';

export const AbstractedTransactionFee = () => {
	const [isDropped, setIsDropped] = useState(false);
	const [isFeeLoading, setIsFeeLoading] = useState(false);
	const [error, setError] = useState('');

	const { tokens, network } = useSnapshot(injectedElements);

	const {
		type,
		token,
		nftCollection,
		transactionFee,
		receiver,
		sender,
		amount,
		nftCollectible,
		tokenForFee,
	} = useSnapshot(transactionContext);

	const handleSetTokenFee = (tokenForFee: Token) => {
		transactionActions.setTokenForFee(tokenForFee as TokenDocument);
	};

	const dropdownRef = useRef(null);

	const tokenForFeeName = handleGetTokenName(
		tokenForFee as TokenDocument,
		network,
	);

	useEffect(() => {
		if (!tokenForFee) {
			transactionActions.setTokenForFee(tokens[0] as TokenDocument);
		}

		const handleReselectTokenForFee = async () => {
			const payload: TransactionPayload = {
				sender: sender,
				receiver: receiver,
				tokenForFee: tokenForFee as Token,
				amount: type === 'Token' ? parseFloat(amount ?? '0') : 1,
				token:
					type === 'Token'
						? (token as TokenDocument)
						: (nftCollectible as CollectibleDocument),
				network: token?.network as Networks,
			};

			setIsFeeLoading(true);
			await handleSetTransactionFee(payload);
			setIsFeeLoading(false);
		};

		handleReselectTokenForFee();
	}, [type, token, nftCollection, tokenForFee, receiver, amount]);

	useEffect(() => {
		if (isDropped && token?.account.mint !== solMint) {
			modalActions.show({
				id: 'NetworkFee',
				component: () => (
					<TokenFeeDropDown
						tokens={tokens as TokenDocument[]}
						onSelect={handleSetTokenFee}
						selectedToken={tokenForFee as Token}
					/>
				),
				bindingRef: dropdownRef,
				bindingDirection: BindDirections.Bottom,
				maskActiveOpacity: 0,
			});
		} else {
			setIsDropped(false);
		}
	}, [isDropped, token]);

	useEffect(() => {
		handleCheckIfBalanceIsEnough(
			tokenForFee as TokenDocument,
			transactionFee as number,
			setError,
		);
	}, [transactionFee]);

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
							{parseFloat(transactionFee?.toPrecision(7) as string) ?? 0}
						</Text>
					)}
					<View ref={dropdownRef} style={styles.feeDisplay}>
						<View style={styles.selectContainer}>
							<Image
								style={styles.tokenIcon}
								source={{
									uri:
										tokenForFee?.metadata?.imageUri ||
										'/img/send-token/unknown-token.jpeg',
								}}
							/>
							<Text numberOfLines={1} style={styles.selectedToken}>
								{tokenForFeeName}
							</Text>
						</View>

						<TouchableOpacity onPress={() => setIsDropped(!isDropped)}>
							<ChevronDown size={20} color="#566674" />
						</TouchableOpacity>
					</View>
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
		width: '100%',
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
		gap: 4,
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
		paddingVertical: 4,
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
	},
	error: {
		color: '#FC9B0A',
		alignSelf: 'flex-end',
		marginTop: 6,
	},
});
