import { useEffect, useMemo, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button, Text, View } from '@walless/gui';
import { showSendTokenModal } from 'modals/SendToken';
import type { WrappedCollection } from 'utils/hooks';
import { useNfts, useSafeAreaInsets } from 'utils/hooks';
import { navigateBack } from 'utils/navigation';

export const CollectibleFeat = () => {
	const [curCollection, setCurCollection] = useState<WrappedCollection>();
	const { collections, collectibles } = useNfts();
	const {
		params: { id = '' },
	} = useRoute() as never;

	const curCollectible = useMemo(() => {
		if (!id) return;

		const collectible = collectibles.find((ele) => ele._id.includes(id));
		return collectible;
	}, [collectibles]);

	useMemo(() => {
		if (!curCollectible) return;

		console.log('curCollection', curCollection);

		setCurCollection(
			collections.find((ele) =>
				ele._id.includes(curCollectible?.collectionId || 'invalid-collection'),
			),
		);
	}, [curCollectible, collections]);

	const handlePressSend = () => {
		showSendTokenModal({
			network: curCollectible?.network,
			collectible: curCollectible,
		});
	};

	useEffect(() => {
		if (!curCollectible) {
			navigateBack();
			if (curCollection?.count === 0) {
				console.log('collection count is 0');
				navigateBack();
			}
		}
	}, [curCollectible]);

	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.scrollContentContainer}
				showsVerticalScrollIndicator={false}
			>
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
							<Text style={styles.nameText}>
								{curCollectible.metadata?.name}
							</Text>
							<Text style={styles.collectionText}>
								{curCollection?.metadata?.name}
							</Text>
						</View>

						<Button title="Send" onPress={handlePressSend} />

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
			</ScrollView>
		</View>
	);
};

export default CollectibleFeat;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 18,
		paddingBottom: 0,
		gap: 18,
	},
	scrollContentContainer: {
		paddingBottom: 50,
	},
	backButton: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 2,
		gap: 6,
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
	subInforBlock: {
		gap: 10,
	},
	subTitleText: {
		fontWeight: '300',
		color: '#566674',
	},
});
