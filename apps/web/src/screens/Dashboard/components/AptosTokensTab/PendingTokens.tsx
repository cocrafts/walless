import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import RequirePasscodeModal from '@walless/app/modals/RequirePasscode';
import { shortenAddress } from '@walless/core';
import { type AptosPendingToken, aptosState } from '@walless/engine';
import { BindDirections, Button, modalActions, Text, View } from '@walless/gui';
import { RequestType } from '@walless/messaging';
import { encryptedMessenger } from 'bridge/utils/messaging';
import { useSnapshot } from 'valtio';

interface Props {
	fee: number;
}

const PendingTokens: FC<Props> = ({ fee }) => {
	const tokens = Array.from(useSnapshot(aptosState).pendingTokens.values());

	const timestampToDate = (timestamp: number) =>
		new Date(timestamp).toLocaleString();

	const handleClaimToken = async (token: AptosPendingToken) => {
		modalActions.show({
			component: () => (
				<RequirePasscodeModal
					title={`Claim ${token.name}`}
					description={`Claim this token will submit an on-chain transaction and will require a ${fee} APT gas fee.`}
					onPasscodeComplete={async (passcode) => {
						const res = await encryptedMessenger.request('kernel', {
							type: RequestType.CLAIM_APTOS_TOKEN,
							transaction: JSON.stringify({
								pubkey: token.toAddress,
								sender: token.fromAddress,
								creator: token.creatorAddress,
								collectionName: token.collectionName,
								name: token.name,
							}),
							passcode,
						});
						return res;
					}}
					onActionComplete={() => {
						modalActions.hide('passcode');
					}}
				/>
			),
			id: 'passcode',
			bindingDirection: BindDirections.InnerBottom,
		});
	};

	return (
		<View style={styles.container}>
			{tokens.map((token) => (
				<View key={token.tokenDataId}>
					<View style={styles.metadataContainer}>
						<Image style={styles.image} source={{ uri: token.uri }} />
						<View style={styles.metadataTextContainer}>
							<Text style={styles.tokenNameText}>{token.name}</Text>
							<Text>Sender: {shortenAddress(token.fromAddress)}</Text>
							<Text style={styles.dateText}>
								{timestampToDate(token.lastTransactionTimestamp)}
							</Text>
						</View>
						<Button
							titleStyle={styles.buttonText}
							title="Claim"
							onPress={() => handleClaimToken(token)}
						/>
					</View>
				</View>
			))}
		</View>
	);
};

export default PendingTokens;

const styles = StyleSheet.create({
	container: {
		gap: 16,
	},
	image: {
		height: 50,
		width: 50,
		borderRadius: 8,
	},
	tokenNameText: {
		fontSize: 16,
		fontWeight: '600',
	},
	metadataContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	metadataTextContainer: {
		flex: 1,
		gap: 2,
	},
	dateText: {
		fontSize: 12,
		color: '#888',
	},
	buttonText: {
		fontWeight: '600',
	},
});
