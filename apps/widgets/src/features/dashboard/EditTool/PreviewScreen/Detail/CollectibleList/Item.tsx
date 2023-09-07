import type { FC } from 'react';
import { Image } from 'react-native';
import { Text, View } from '@walless/gui';
import type { MetadataDocument } from '@walless/store';

interface Props {
	item: MetadataDocument;
}

const CollectibleItem: FC<Props> = ({ item }) => {
	const imgSize = 130;
	const { name, imageUri } = item;
	const iconSource = {
		uri: imageUri || '/img/question.png',
	};
	return (
		<View
			style={{
				padding: 12,
				backgroundColor: '#131C24',
				alignItems: 'center',
				gap: 10,
				borderRadius: 10,
			}}
		>
			<Image
				style={{
					width: imgSize,
					height: imgSize,
					backgroundColor: '#0B1218',
					borderRadius: 10,
				}}
				source={iconSource}
			/>

			<View>
				<Text>{`${name?.slice(0, 10)}...`}</Text>
				<Text>40</Text>
			</View>
		</View>
	);
};

export default CollectibleItem;
