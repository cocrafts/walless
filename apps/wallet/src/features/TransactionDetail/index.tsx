import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks, SolanaTransferHistory } from '@walless/core';
import { View } from '@walless/gui';
import type { HistoryDocument } from '@walless/store';
import { appState } from 'state/app';
import assets from 'utils/assets';
import type { NetworkInfo } from 'utils/helper';
import { getNetworkInfo } from 'utils/helper';
import { useSnapshot } from 'valtio';

import InformationDetails from './InformationDetails/InformationDetails';
import AddressDetails from './AddressDetails';
import TokenDetails from './TokenDetails';

export const SolanaTransactionDetailsFeature: FC<
	HistoryDocument<SolanaTransferHistory>
> = ({
	_id,
	date,
	amount,
	transactionType,
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
	const icon = token.image ? { uri: token.image } : assets.misc.unknownToken;

	return (
		<View style={styles.container}>
			<TokenDetails
				id={_id}
				icon={icon}
				tokenName={token?.name || 'Unknown'}
				amount={amount}
				network={networkInfo?.name as Networks}
				isCollectible={!!token}
			/>

			<AddressDetails
				sender={sender}
				receiver={receiver}
				type={transactionType}
				profileImage={{ uri: profile.profileImage }}
				networkImage={networkInfo?.icon}
			/>

			<InformationDetails
				date={new Date(date)}
				status={status}
				networkInfo={networkInfo as NetworkInfo}
				fee={fee}
				tokenForFeeSymbol={tokenForFee.symbol}
			/>
		</View>
	);
};

export default SolanaTransactionDetailsFeature;

const styles = StyleSheet.create({
	container: {
		gap: 16,
		paddingVertical: 4,
	},
});
