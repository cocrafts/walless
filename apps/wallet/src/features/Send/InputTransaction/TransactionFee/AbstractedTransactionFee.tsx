import type { FC } from 'react';
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
import type { TokenDocument } from '@walless/store';
import { filterGasilonTokens } from 'utils/gasilon';
import { useSnapshot } from 'valtio';

import { txActions, txContext } from '../../context';

import {
	getTokenName,
	handleCheckIfBalanceIsEnough,
	requestTransactionFee,
} from './internal';
import TokenFeeDropDown from './TokenFeeDropDown';

interface Props {
	tokenList: TokenDocument[];
}

export const AbstractedTransactionFee: FC<Props> = ({ tokenList }) => {
	const [isFeeLoading, setIsFeeLoading] = useState(false);
	const [error, setError] = useState('');
	const [tokenForFeeList, setTokenForFeeList] = useState<TokenDocument[]>([
		tokenList[0],
	]);

	const {
		type,
		token,
		transactionFee,
		receiver,
		sender,
		amount,
		collectible,
		tokenForFee,
	} = useSnapshot(txContext).tx;
	const chosenToken = type === 'Token' ? token : collectible;
	const enableSelectFee =
		chosenToken?.account?.mint !== solMint && tokenForFeeList.length > 1;

	const dropdownRef = useRef(null);

	if (!tokenForFee) {
		txActions.update({ tokenForFee: tokenList[0] });
	}

	const tokenForFeeName = getTokenName(
		tokenForFee as TokenDocument,
		chosenToken?.network,
	);

	useEffect(() => {
		(async () => {
			const tokens = await filterGasilonTokens(tokenList);
			setTokenForFeeList([tokenList[0], ...tokens]);
		})();
	}, []);

	useEffect(() => {
		const updateTransactionFee = async () => {
			if (!chosenToken) {
				txActions.update({ transactionFee: 0 });
				return;
			}

			const payload: TransactionPayload = {
				sender: sender,
				receiver: receiver,
				tokenForFee: tokenForFee as Token,
				amount: type === 'Token' ? parseFloat(amount || '0') : 1,
				token: chosenToken as TokenDocument,
				network: chosenToken?.network as Networks,
			};

			setIsFeeLoading(true);
			const fee = await requestTransactionFee(payload);
			const decimals = payload.tokenForFee?.account?.decimals;
			txActions.update({
				transactionFee: parseFloat(fee.toPrecision(decimals)),
			});
			setIsFeeLoading(false);
		};
		updateTransactionFee();
	}, [tokenForFee, token, collectible, receiver]);

	useEffect(() => {
		if (token?.account.mint === solMint) {
			txActions.update({ tokenForFee: token as TokenDocument });
		}
	}, [token]);

	const handlePressSelect = () => {
		if (!enableSelectFee) return;
		modalActions.show({
			id: 'NetworkFee',
			component: () => (
				<TokenFeeDropDown
					tokens={tokenForFeeList}
					onSelect={(token) => txActions.update({ tokenForFee: token })}
					selectedToken={tokenForFee as TokenDocument}
				/>
			),
			bindingRef: dropdownRef,
			bindingDirection: BindDirections.Bottom,
			maskActiveOpacity: 0,
			positionOffset: { y: 4 },
		});
	};

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
							{parseFloat((transactionFee || 0)?.toPrecision(7) as string)}
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
