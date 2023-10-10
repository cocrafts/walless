import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { Token } from '@walless/core';
import { Networks } from '@walless/core';
import {
	BindDirections,
	Hoverable,
	modalActions,
	Text,
	View,
} from '@walless/gui';
import { ChevronDown, Exclamation } from '@walless/icons';
import type { TokenDocument } from '@walless/store';
import { useSnapshot } from 'valtio';

import {
	injectedElements,
	transactionActions,
	transactionContext,
} from '../../../../../state/transaction';

import TokenFeeDropDown from './TokenFeeDropDown';

interface Props {
	tokenForFee?: Token;
	feeText?: string;
}

export const NetworkFee: FC<Props> = () => {
	const [isDropped, setIsDropped] = useState(false);

	const { tokens } = useSnapshot(injectedElements);

	const [tokenForFee, setTokenForFee] = useState<Token>(tokens[0] as Token);

	const { type, token, nftCollection, transactionFee } =
		useSnapshot(transactionContext);
	const { getTransactionFee } = useSnapshot(injectedElements);

	const handleSetTokenFee = (tokenForFee?: Token) => {
		if (!tokenForFee) {
			setTokenForFee(tokens[0] as Token);
		} else {
			setTokenForFee(tokenForFee);
			setIsDropped(false);
			transactionActions.setTokenForFee(tokenForFee as TokenDocument);
		}
	};

	const getExchangeRate = (fromToken: Token, toToken: Token) => {
		return 18;
	};

	const dropdownRef = useRef(null);

	useEffect(() => {
		(async () => {
			if (type === 'Token' && token?.network) {
				const fee = await getTransactionFee(token.network as Networks);
				transactionActions.setTransactionFee(fee);
			} else if (type === 'Collectible' && nftCollection?.network) {
				const fee = await getTransactionFee(nftCollection.network as Networks);
				transactionActions.setTransactionFee(fee);
			} else transactionActions.setTransactionFee(0);
		})();
	}, [type, token, nftCollection]);

	useEffect(() => {
		(async () => {
			const nativeFee = await getTransactionFee(token?.network as Networks);

			if (token?.network == Networks.solana) {
				if (tokenForFee) {
					transactionActions.setTokenForFee(tokenForFee as TokenDocument);
					const fee = nativeFee * getExchangeRate(token as Token, tokenForFee);
					transactionActions.setTransactionFee(fee);
				}
				if (tokenForFee === tokens[0]) {
					transactionActions.setTransactionFee(nativeFee);
				}
			}
		})();
	}, [tokenForFee]);

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

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Exclamation color="#566674" size={10} />
				<Text style={styles.titleText}>Network fee</Text>
			</View>

			<View style={styles.valueContainer}>
				<Text style={styles.feeText}>{transactionFee}</Text>
				<View style={styles.feeDisplay}>
					<View style={styles.selectContainer} ref={dropdownRef}>
						<Text style={styles.selectedToken}>
							{tokenForFee?.metadata?.symbol}
						</Text>
					</View>

					<TouchableOpacity onPress={() => setIsDropped(!isDropped)}>
						<ChevronDown color="#566674" />
					</TouchableOpacity>
				</View>
			</View>
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
	equalText: {
		fontWeight: '400',
		fontSize: 12,
		color: '#566674',
	},
	feeDisplay: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	selectContainer: {
		width: 50,
	},
	dropdown: {
		position: 'absolute',
		width: 50,
		top: 20,
		backgroundColor: '#566674',
		borderRadius: 8,
	},
	selectedToken: {
		alignSelf: 'center',
		color: '#ffffff',
	},
	tokenOption: {
		borderRadius: 8,
		padding: 4,
	},
});
