import { type FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { appState } from '@walless/app';
import { Networks, shortenAddress } from '@walless/core';
import type { Transaction } from '@walless/engine/solana/transaction';
import { Anchor, Text, View } from '@walless/gui';
import { ArrowDown } from '@walless/icons';
import { getNetworkInfo } from 'utils/helper';
import { useSnapshot } from 'valtio';

import ModalContainer from './components/ModalContainer';

const TransactionDetails: FC<Transaction> = ({
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
}) => {
	const { profile, endpoints } = useSnapshot(appState);
	const networkInfo = getNetworkInfo(network);
	let networkExplorerLink;
	let networkExplorerName;

	switch (networkInfo?.name) {
		case Networks.solana: {
			const endpoint = endpoints?.solana;
			networkExplorerLink = `https://solscan.io/tx/${id}?cluster=${endpoint}`;
			networkExplorerName = 'Solscan';
			break;
		}
		default: {
			const endpoint = endpoints?.solana;
			networkExplorerLink = `https://solscan.io/tx/${id}?cluster=${endpoint}`;
			networkExplorerName = 'Solscan';
		}
	}

	let senderImage;
	let receiverImage;
	if (type === 'sent') {
		senderImage = profile?.profileImage;
		receiverImage = networkInfo?.icon;
	} else {
		senderImage = networkInfo?.icon;
		receiverImage = profile?.profileImage;
	}

	const nftStyle = { minHeight: 100, minWidth: 70 };
	const tokenStyle = { width: 50, height: 50, borderRadius: 50 };

	return (
		<ModalContainer title="Transaction Details">
			<View style={styles.container}>
				<View style={styles.tokenContainer}>
					<View style={styles.tokenContainer}>
						<Image
							source={{ uri: token.metadata?.imageUri }}
							style={[
								styles.tokenImage,
								token.metadata?.mpl ? nftStyle : tokenStyle,
							]}
						/>
						<Text style={styles.tokenName}>
							{amount} {token.metadata?.name?.replaceAll('\u0000', '').trim()}
						</Text>
					</View>
					<Anchor
						href={networkExplorerLink}
						title={`View on ${networkExplorerName}`}
					/>
				</View>
				<View style={styles.subpartContainer}>
					<View style={styles.fromToContainer}>
						<Text>From</Text>
						<Text>To</Text>
					</View>
					<View style={styles.transferContainer}>
						<View style={styles.addressContainer}>
							<Image
								source={{ uri: senderImage }}
								style={styles.profileImage}
							/>
							<Text>{shortenAddress(sender)}</Text>
						</View>
						<View style={styles.arrowContainer}>
							<ArrowDown size={16} color="#0694D3" />
						</View>
						<View style={styles.addressContainer}>
							<Image
								source={{ uri: receiverImage }}
								style={styles.profileImage}
							/>
							<Text>{shortenAddress(receiver)}</Text>
						</View>
					</View>
				</View>
				<View style={styles.subpartContainer}>
					<Text>Transaction</Text>
					<View style={styles.transactionInfo}>
						<View style={styles.detailContainer}>
							<Text style={styles.infoTitle}>Date</Text>
							<Text style={styles.infoText}>
								{date.toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</Text>
						</View>
						<View style={styles.separatedLine} />

						<View style={styles.detailContainer}>
							<Text style={styles.infoTitle}>Status</Text>
							<View>
								<Text>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
							</View>
						</View>
						<View style={styles.separatedLine} />

						<View style={styles.detailContainer}>
							<Text style={styles.infoTitle}>Network</Text>
							<View style={styles.networkContainer}>
								<Image
									source={{ uri: networkInfo?.icon }}
									style={styles.networkIcon}
								/>
								<Text style={styles.infoText}>{networkInfo?.name}</Text>
							</View>
						</View>
						<View style={styles.separatedLine} />

						<View style={styles.detailContainer}>
							<Text style={styles.infoTitle}>Network fee</Text>
							<Text style={styles.infoText}>{fee} SOL</Text>
						</View>
					</View>
				</View>
			</View>
		</ModalContainer>
	);
};

export default TransactionDetails;

const styles = StyleSheet.create({
	container: {
		minWidth: 340,
		gap: 16,
	},
	tokenContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4,
	},
	tokenImage: {
		width: 50,
		height: 50,
	},
	tokenName: {
		fontSize: 24,
		textAlign: 'center',
	},
	subpartContainer: {
		gap: 6,
	},
	transferContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#131C24',
		borderRadius: 8,
		padding: 16,
	},
	addressContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	fromToContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	arrowContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		transform: [{ rotate: '270deg' }],
		borderWidth: 1,
		borderColor: '#0694D3',
		borderRadius: 50,
		padding: 4,
	},
	profileImage: {
		width: 24,
		height: 24,
		borderRadius: 24,
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
	networkContainer: {
		flexDirection: 'row',
	},
	networkIcon: {
		width: 16,
		height: 16,
		borderRadius: 16,
	},
	separatedLine: {
		height: 1,
		width: '100%',
		backgroundColor: '#566674',
	},
});
