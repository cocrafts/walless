import type { FC } from 'react';
import { useMemo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { Button, Hoverable, Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import { appActions } from 'state/app';
import { useNfts, useParams } from 'utils/hooks';
import { router } from 'utils/routing';

export const Nft: FC = () => {
	const { id } = useParams<'id'>();
	const { collections, collectibles } = useNfts();

	const curCollectible = useMemo(() => {
		if (!id) return;
		return collectibles.find((ele) => ele._id.includes(id));
	}, [collectibles]);

	const curCollection = useMemo(() => {
		if (!curCollectible) {
			router.navigate(-1);
			return;
		}
		return collections.find((ele) => ele._id === curCollectible.collectionId);
	}, [curCollectible, collections]);

	const handlePressSend = () => {
		appActions.showSendModal({
			layoutNetwork: Networks.solana,
			collectible: curCollectible,
		});
	};

	return (
		<View style={styles.container}>
			<Hoverable style={styles.backButton} onPress={() => router.navigate(-1)}>
				<ChevronLeft size={16} />
				<Text style={styles.title}>NFT</Text>
			</Hoverable>

			{curCollectible ? (
				<View style={styles.contentContainer}>
					<View style={styles.nftContainer}>
						<Image
							style={styles.nftImage}
							source={{ uri: curCollectible.metadata?.imageUri }}
							resizeMode="contain"
						/>
					</View>

					<View>
						<Text style={styles.nameText}>{curCollectible.metadata?.name}</Text>
						<Text style={styles.collectionText}>
							{curCollection?.metadata?.name}
						</Text>
					</View>

					<Button
						title="Send"
						titleStyle={styles.nameText}
						onPress={handlePressSend}
					/>

					{curCollectible.metadata?.attributes &&
						curCollectible.metadata.attributes.length > 0 && (
							<View style={styles.subInforBlock}>
								<Text style={styles.subTitleText}>Attributes</Text>
								<View style={styles.attributesBlock}>
									{curCollectible.metadata.attributes.map((ele, index) => (
										<View style={styles.attributeBlock} key={index}>
											<Text style={styles.subTitleText}>{ele.key}</Text>
											<Text>{ele.value}</Text>
										</View>
									))}
								</View>
							</View>
						)}

					{curCollectible.metadata?.description && (
						<View style={styles.subInforBlock}>
							<Text style={styles.subTitleText}>Description</Text>
							<Text>{curCollectible.metadata.description}</Text>
						</View>
					)}
				</View>
			) : (
				<Text>Not found</Text>
			)}
		</View>
	);
};

export default Nft;

const styles = StyleSheet.create({
	container: {
		padding: 10,
		gap: 17,
		paddingBottom: 50,
	},
	backButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		marginTop: 6,
	},
	title: {
		fontSize: 18,
		color: '#FFFFFF',
	},
	contentContainer: {
		rowGap: 14,
	},
	nftContainer: {
		padding: 10,
		borderRadius: 15,
		backgroundColor: '#0B1218',
		marginHorizontal: 'auto',
	},
	nftImage: {
		height: 240,
		width: 240,
		marginHorizontal: 'auto',
	},
	nameText: {
		fontSize: 18,
		fontWeight: '500',
		color: '#FFFFFF',
		marginHorizontal: 'auto',
	},
	collectionText: {
		fontSize: 14,
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
		backgroundColor: '#131C24',
	},
	subInforBlock: {
		gap: 10,
	},
	subTitleText: {
		color: '#566674',
	},
});
