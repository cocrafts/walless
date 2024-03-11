import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import type { SolanaCollectible } from '@walless/core';
import { Button, Text, View } from '@walless/gui';
import type { NftDocument } from '@walless/store';
import { showSendTokenModal } from 'modals/SendToken';
import type { WrappedCollection } from 'utils/hooks';

type Props = {
	collectible: NftDocument<SolanaCollectible>;
	collection?: WrappedCollection;
};

const SolanaCollectibleScreen: FC<Props> = ({ collectible, collection }) => {
	const handlePressSend = () => {
		showSendTokenModal({
			nft: collectible,
			network: collectible.network,
		});
	};

	return (
		<View style={styles.contentContainer}>
			<View style={styles.nftContainer}>
				<Image
					style={styles.nftImage}
					source={{ uri: collectible.image }}
					resizeMode="contain"
				/>
			</View>

			<View>
				<Text style={styles.nameText}>{collectible.name}</Text>
				<Text style={styles.collectionText}>{collection?.name}</Text>
			</View>

			<Button title="Send" onPress={handlePressSend} />

			{collectible.attributes && collectible.attributes.length > 0 && (
				<View style={styles.subInfoBlock}>
					<Text style={styles.subTitleText}>Attributes</Text>
					<View style={styles.attributesBlock}>
						{collectible.attributes.map((ele, index) => (
							<View style={styles.attributeBlock} key={index}>
								<Text style={styles.subTitleText}>{ele.key}</Text>
								<Text>{ele.value}</Text>
							</View>
						))}
					</View>
				</View>
			)}
			{collectible.description && (
				<View style={styles.subInfoBlock}>
					<Text style={styles.subTitleText}>Description</Text>
					<Text>{collectible.description}</Text>
				</View>
			)}
		</View>
	);
};

export default SolanaCollectibleScreen;

const styles = StyleSheet.create({
	contentContainer: {
		rowGap: 14,
	},
	nftContainer: {
		padding: 10,
		borderRadius: 16,
		backgroundColor: '#0B1218',
		marginHorizontal: 'auto',
		alignItems: 'center',
	},
	nftImage: {
		height: 240,
		width: 240,
		borderRadius: 11,
	},
	nameText: {
		fontSize: 18,
		color: '#FFFFFF',
		marginHorizontal: 'auto',
	},
	collectionText: {
		marginTop: 4,
		fontWeight: '300',
		color: '#566674',
		marginHorizontal: 'auto',
	},
	attributesBlock: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
	},
	attributeBlock: {
		borderRadius: 5,
		paddingVertical: 6,
		paddingHorizontal: 12,
		gap: 4,
		backgroundColor: '#202d38',
	},
	subInfoBlock: {
		gap: 10,
	},
	subTitleText: {
		fontWeight: '300',
		color: '#566674',
	},
});
