import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';

import type { ProjectNft } from '../../types';

export interface CollectibleCardProps {
	collectible: ProjectNft;
	setActiveCollectible: (collectible: ProjectNft) => void;
	isActive: boolean;
}

const CollectibleCard: FC<CollectibleCardProps> = ({
	collectible,
	isActive,
	setActiveCollectible,
}) => {
	const infoContainerStyle: ViewStyle = {
		...styles.infoContainer,
		borderColor: isActive ? '#293642' : 'transparent',
	};

	return (
		<Hoverable
			style={styles.container}
			onPress={() => setActiveCollectible(collectible)}
		>
			<Image style={styles.thumbnail} source={{ uri: collectible.thumbnail }} />
			<View style={infoContainerStyle}>
				<Image style={styles.logo} source={{ uri: collectible.logo }} />
				<Text style={styles.name}>{collectible.name}</Text>
			</View>
		</Hoverable>
	);
};

export default CollectibleCard;

const styles = StyleSheet.create({
	container: {
		width: 150,
		marginBottom: 18,
		overflow: 'hidden',
		backgroundColor: '#131C24',
		borderRadius: 12,
	},
	thumbnail: {
		height: 82,
	},
	infoContainer: {
		paddingHorizontal: 9,
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
		borderWidth: 1,
		borderTopWidth: 0,
	},
	logo: {
		width: 35,
		height: 35,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: '#10181F',
		position: 'relative',
		top: -18,
	},
	name: {
		fontWeight: '600',
		wordWrap: 'break-word',
		textOverflow: 'ellipsis',
		marginTop: -12,
		marginBottom: 9,
	},
});
