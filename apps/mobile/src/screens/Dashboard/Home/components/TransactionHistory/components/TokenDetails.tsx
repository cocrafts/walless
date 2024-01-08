import type { FC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { appState } from '@walless/engine';
import { Anchor, Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import { removeRedundantCharacters } from '../internal';

interface Props {
	id: string;
	icon: ImageSourcePropType;
	tokenName: string;
	isCollectible?: boolean;
	amount: number;
	network: Networks;
}

const TokenDetails: FC<Props> = ({
	icon,
	tokenName,
	amount,
	id,
	network,
	isCollectible = false,
}) => {
	const { endpoints } = useSnapshot(appState);
	let networkExplorerLink;
	let networkExplorerName;

	switch (network) {
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

	const tokenImageStyle = {
		borderRadius: isCollectible ? 16 : 40,
	};

	return (
		<View style={styles.tokenContainer}>
			<View style={styles.tokenContainer}>
				<Image source={icon} style={[styles.tokenImage, tokenImageStyle]} />
				<Text style={styles.tokenName}>
					{amount} {removeRedundantCharacters(tokenName)}
				</Text>
			</View>
			<Anchor
				href={networkExplorerLink}
				title={`View on ${networkExplorerName}`}
			/>
		</View>
	);
};

export default TokenDetails;

const styles = StyleSheet.create({
	tokenContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	tokenImage: {
		width: 80,
		height: 80,
	},
	tokenName: {
		fontSize: 20,
		color: '#ffffff',
		textAlign: 'center',
		marginTop: 8,
	},
});