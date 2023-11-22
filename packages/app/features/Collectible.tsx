import type { FC } from 'react';
import { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { showSendModal } from '@walless/app';
import { Button, Hoverable, Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import { utils } from '@walless/ioc';

import { useNfts } from '../utils/hooks';

interface Props {
	id: string;
	style?: StyleProp<ViewStyle>;
}

export const CollectibleFeat: FC<Props> = ({ id, style }) => {
	const { collections, collectibles } = useNfts();

	const curCollectible = useMemo(() => {
		if (!id) return;
		return collectibles.find((ele) => ele._id.includes(id));
	}, [collectibles]);

	const curCollection = useMemo(() => {
		if (!curCollectible) {
			utils.navigateBack();
			return;
		}
		return collections.find((ele) => ele._id === curCollectible.collectionId);
	}, [curCollectible, collections]);

	const handlePressSend = () => {
		showSendModal({
			layoutNetwork: curCollectible?.network,
			collectible: curCollectible,
		});
	};

	return (
		<View style={[styles.container, style]}>
			<Hoverable style={styles.backButton} onPress={utils.navigateBack}>
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

export default CollectibleFeat;

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
