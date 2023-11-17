import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Networks, shortenAddress } from '@walless/core';
import type { AptosPendingToken } from '@walless/engine';
import { aptosState } from '@walless/engine';
import { Button, Text, View } from '@walless/gui';
import { aptosHandler, utils } from '@walless/kernel';
import type { ResponsePayload } from '@walless/messaging';
import { ResponseCode } from '@walless/messaging';
import { useSnapshot } from 'valtio';

import { showRequirePasscodeModal } from '../../../Passcode';

interface Props {
	fee: number;
}

const PendingTokens: FC<Props> = ({ fee }) => {
	const tokens = Array.from(useSnapshot(aptosState).pendingTokens.values());

	const timestampToDate = (timestamp: number) =>
		new Date(timestamp).toLocaleString();

	const handleOnPasscodeComplete = async (
		token: AptosPendingToken,
		passcode: string,
	) => {
		const res = {} as ResponsePayload;

		let privateKey;
		try {
			privateKey = await utils.getPrivateKey(Networks.aptos, passcode);
		} catch {
			res.responseCode = ResponseCode.WRONG_PASSCODE;
			return res;
		}

		const transaction = {
			pubkey: token.toAddress,
			sender: token.fromAddress,
			creator: token.creatorAddress,
			collectionName: token.collectionName,
			name: token.name,
		} satisfies aptosHandler.AptosClaimTokenPayload;

		try {
			res.signatureString = aptosHandler.handleClaimToken(
				privateKey,
				transaction,
			);
			res.responseCode = ResponseCode.SUCCESS;
		} catch (error) {
			res.responseCode = ResponseCode.ERROR;
		}

		return res;
	};

	const handleClaimToken = async (token: AptosPendingToken) => {
		showRequirePasscodeModal({
			title: `Claim ${token.name}`,
			desc: `Claim this token will submit an on-chain transaction and will require a ${fee} APT gas fee.`,
			onPasscodeComplete: async (passcode) =>
				handleOnPasscodeComplete(token, passcode),
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
