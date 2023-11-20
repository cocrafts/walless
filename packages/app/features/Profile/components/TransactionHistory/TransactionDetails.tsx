import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { NetworkInfo } from '@walless/app/utils';
import { getNetworkInfo } from '@walless/app/utils';
import type { Networks, Transaction } from '@walless/core';
import { appState } from '@walless/engine';
import { View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import AddressDetails from './components/AddressDetails';
import InformationDetails from './components/InformationDetails';
import ModalContainer from './components/ModalContainer';
import TokenDetails from './components/TokenDetails';

export const TransactionDetails: FC<Transaction> = ({
	id,
	date,
	amount,
	type,
	status,
	network,
	token,
	sender,
	receiver,
	fee,
	tokenForFee,
}) => {
	const { profile } = useSnapshot(appState);
	const networkInfo = getNetworkInfo(network);

	return (
		<ModalContainer id="transaction-details" title="Transaction Details">
			<View style={styles.container}>
				<TokenDetails
					id={id}
					imageUri={token.metadata?.imageUri}
					tokenName={token.metadata?.name}
					amount={amount}
					network={networkInfo?.name as Networks}
					isCollectible={!!token.metadata?.mpl}
				/>

				<AddressDetails
					sender={sender}
					receiver={receiver}
					type={type}
					profileImage={{ uri: profile.profileImage }}
					networkImage={networkInfo?.icon}
				/>

				<InformationDetails
					date={date}
					status={status}
					networkInfo={networkInfo as NetworkInfo}
					fee={fee}
					tokenForFeeSymbol={tokenForFee.metadata?.symbol}
				/>
			</View>
		</ModalContainer>
	);
};

export default TransactionDetails;

const styles = StyleSheet.create({
	container: {
		minWidth: 340,
		gap: 16,
		paddingVertical: 4,
	},
});
