import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import type { Collectible, Token, TransactionPayload } from '@walless/core';
import type { Networks } from '@walless/core';
import { BindDirections, modalActions, Text, View } from '@walless/gui';
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
	payload?: TransactionPayload;
	feeText?: string;
}

export const NetworkFee: FC<Props> = () => {
	const [isDropped, setIsDropped] = useState(false);
	const [isFeeLoading, setIsFeeLoading] = useState(false);

	const { tokens, getTransactionFee, getTransactionAbstractFee } =
		useSnapshot(injectedElements);

	const [tokenForFee, setTokenForFee] = useState<Token>(tokens[0] as Token);

	const {
		type,
		token,
		nftCollection,
		transactionFee,
		receiver,
		sender,
		amount,
		nftCollectible,
	} = useSnapshot(transactionContext);

	const payload: TransactionPayload = {
		sender: sender,
		receiver: receiver,
		tokenForFee: tokenForFee as Token,
		amount: parseFloat(amount ?? '1'),
		token: token as Token,
		network: token?.network as Networks,
	};

	const handleSetTokenFee = (tokenForFee?: Token) => {
		if (!tokenForFee) {
			setTokenForFee(tokens[0] as Token);
		} else {
			setTokenForFee(tokenForFee);
			setIsDropped(false);
			transactionActions.setTokenForFee(tokenForFee as TokenDocument);
		}
	};

	const dropdownRef = useRef(null);

	useEffect(() => {
		(async () => {
			if (!payload.receiver) {
				transactionActions.setTransactionFee(0);
				return;
			}

			if (type === 'Token' && token?.network) {
				setIsFeeLoading(true);

				let fee = await getTransactionFee(token.network as Networks);
				if (tokenForFee !== tokens[0]) {
					fee = await getTransactionAbstractFee(payload);
				}
				transactionActions.setTransactionFee(fee);

				setIsFeeLoading(false);
			} else if (type === 'Collectible' && nftCollection?.network) {
				setIsFeeLoading(true);

				payload.token = nftCollectible as Collectible;

				let fee = await getTransactionFee(nftCollection.network as Networks);
				if (tokenForFee !== tokens[0]) {
					fee = await getTransactionAbstractFee(payload);
				}
				transactionActions.setTransactionFee(fee);

				setIsFeeLoading(false);
			} else transactionActions.setTransactionFee(0);
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

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Exclamation color="#566674" size={10} />
				<Text style={styles.titleText}>Network fee</Text>
			</View>

			<View style={styles.valueContainer}>
				{isFeeLoading ? (
					<ActivityIndicator size="small" color="#FFFFFF" />
				) : (
					<Text style={styles.feeText}>
						{parseFloat(transactionFee?.toPrecision(4) as string) ?? 0}
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
							{tokenForFee?.metadata?.symbol ?? 'Unknown'}
						</Text>
					</View>

					<TouchableOpacity onPress={() => setIsDropped(!isDropped)}>
						<ChevronDown size={20} color="#566674" />
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
	dropdown: {
		position: 'absolute',
		width: 50,
		top: 20,
		backgroundColor: '#566674',
		borderRadius: 8,
	},
	selectedToken: {
		color: '#ffffff',
	},
	tokenOption: {
		borderRadius: 8,
		padding: 4,
	},
});
