import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import {
	Collectible,
	Networks,
	Token,
	TransactionPayload,
} from '@walless/core';
import { BindDirections, modalActions, Text, View } from '@walless/gui';
import { ChevronDown, Exclamation } from '@walless/icons';
import type { CollectibleDocument, TokenDocument } from '@walless/store';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../../../state/transaction';

import TokenFeeDropDown from './TokenFeeDropDown';

interface Props {
	tokenForFee?: Token;
	payload?: TransactionPayload;
	feeText?: string;
}

export const NetworkFee: FC<Props> = () => {
	const [isDropped, setIsDropped] = useState(false);
	const [isFeeLoading, setIsFeeLoading] = useState(false);
	const [error, setError] = useState<string>('');

	const { tokens, getTransactionFee, getTransactionAbstractFee } =
		useSnapshot(injectedElements);

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

	let tokenForFeeName = 'Unknown';

	if (token?.network == Networks.solana) {
		if (tokenForFee && tokenForFee.metadata?.symbol) {
			tokenForFeeName = tokenForFee.metadata.symbol;
			if (tokenForFeeName.includes('-Dev')) {
				tokenForFeeName = tokenForFeeName.replace('-Dev', '');
			}
		} else {
			tokenForFeeName = 'SOL';
		}
	} else if (token?.network == Networks.sui) {
		tokenForFeeName = 'SUI';
	} else if (token?.network == Networks.aptos) {
		tokenForFeeName = 'APT';
	}

	useEffect(() => {
		if (!tokenForFee) {
			transactionActions.setTokenForFee(tokens[0] as TokenDocument);
		}

		(async () => {
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

			if (payload.receiver === '' || payload.amount === 0) {
				transactionActions.setTransactionFee(0);
				return;
			}

			setIsFeeLoading(true);
			let fee = await getTransactionFee(payload);

			if (tokenForFee?.metadata?.symbol !== 'SOL') {
				fee = await getTransactionAbstractFee(payload);
			}
			transactionActions.setTransactionFee(
				parseFloat(fee.toPrecision(tokenForFee?.account?.decimals ?? 7)),
			);

			setIsFeeLoading(false);
		})();
	}, [type, token, nftCollection, tokenForFee, receiver, amount]);

	useEffect(() => {
		if (isDropped) {
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
		}
	}, [isDropped]);

	useEffect(() => {
		if (
			parseFloat(tokenForFee?.account.balance as string) /
				10 ** (tokenForFee?.account.decimals ?? 0) <
			(transactionFee ?? 0)
		) {
			setError(
				`Not enough ${
					tokenForFee?.metadata?.symbol ?? 'Unknown'
				}, select other token`,
			);
		} else {
			setError('');
		}
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
						<Text
							style={[styles.feeText, error !== '' && { color: '#FC9B0A' }]}
						>
							{parseFloat(transactionFee?.toPrecision(7) as string) ?? 0}
						</Text>
					)}
					<View ref={dropdownRef} style={styles.feeDisplay}>
						<View style={styles.selectContainer}>
							<Image
								style={styles.tokenIcon}
								source={{
									uri:
										tokenForFee?.metadata?.imageUri ??
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
