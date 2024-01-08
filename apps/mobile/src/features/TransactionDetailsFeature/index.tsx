import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks, Transaction } from '@walless/core';
import { appState } from '@walless/engine';
import { View } from '@walless/gui';
import { modules } from '@walless/ioc';
import type { NetworkInfo } from 'utils/helper';
import { getNetworkInfo } from 'utils/helper';
import { useSnapshot } from 'valtio';

import InformationDetails from './InformationDetails/InformationDetails';
import AddressDetails from './AddressDetails';
import TokenDetails from './TokenDetails';

export const TransactionDetailsFeature: FC<Transaction> = ({
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
	const icon = token.metadata?.imageUri
		? { uri: token.metadata.imageUri }
		: modules.asset.misc.unknownToken;

	return (
		<View style={styles.container}>
			<TokenDetails
				id={id}
				icon={icon}
				tokenName={token.metadata?.name || 'Unknown'}
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
	);
};

export default TransactionDetailsFeature;

const styles = StyleSheet.create({
	container: {
		gap: 16,
		paddingVertical: 4,
	},
});
