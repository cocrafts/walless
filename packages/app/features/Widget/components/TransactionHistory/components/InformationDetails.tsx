import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

import { handleConvertDateToReadable } from '../internal';

import InfoContainer from './InfoContainer';
import NetworkDetails from './NetworkDetails';
import TransactionStatus from './TransactionStatus';

interface Props {
	date: Date;
	status: 'success' | 'pending' | 'failed';
	networkInfo?: {
		name: string;
		icon: string;
	};
	fee: number;
	tokenForFeeSymbol?: string;
}

const InformationDetails: FC<Props> = ({
	date,
	fee,
	networkInfo,
	status,
	tokenForFeeSymbol = 'Unknown',
}) => {
	return (
		<View style={styles.container}>
			<Text>Transaction</Text>
			<View style={styles.transactionInfo}>
				<InfoContainer
					title="Date"
					content={
						<Text style={styles.infoText}>
							{handleConvertDateToReadable(date)}
						</Text>
					}
				/>
				<View style={styles.separatedLine} />

				<InfoContainer
					title="Status"
					content={<TransactionStatus status={status} />}
				/>
				<View style={styles.separatedLine} />

				<InfoContainer
					title="Network"
					content={<NetworkDetails networkInfo={networkInfo} />}
				/>
				<View style={styles.separatedLine} />

				<InfoContainer
					title="Network fee"
					content={
						<Text style={styles.infoText}>
							{fee} {tokenForFeeSymbol}
						</Text>
					}
				/>
			</View>
		</View>
	);
};

export default InformationDetails;

const styles = StyleSheet.create({
	container: {
		gap: 12,
	},
	transactionInfo: {
		flex: 1,
		backgroundColor: '#131C24',
		borderRadius: 8,
		paddingHorizontal: 16,
	},
	infoText: {
		color: '#566674',
	},
	infoTitle: {
		color: '#ffffff',
	},
	detailContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 18,
	},
	separatedLine: {
		height: 1,
		width: '100%',
		backgroundColor: '#566674',
	},
});
