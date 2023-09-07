import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Image } from 'react-native';
import { shortenAddress } from '@walless/core';
import { Text, View } from '@walless/gui';
import type { MetadataDocument } from '@walless/store';

interface Props {
	style?: StyleProp<ViewStyle>;
	index: number;
	item: MetadataDocument;
}

export const TokenItem: FC<Props> = ({ item }) => {
	const iconSize = 28;
	const { _id, name, symbol, imageUri } = item;
	const iconSource = {
		uri: imageUri || '/img/question.png',
	};

	return (
		<View
			style={{
				flexDirection: 'row',
				backgroundColor: '#131C24',
				paddingVertical: 10,
				paddingHorizontal: 12,
			}}
		>
			<View
				style={{
					backgroundColor: '#202634',
				}}
			>
				<Image
					style={{
						width: iconSize,
						height: iconSize,
						borderRadius: iconSize / 2,
						resizeMode: 'cover',
					}}
					source={iconSource}
				/>
			</View>
			<View>
				<Text>{symbol || name || shortenAddress(_id)}</Text>
			</View>
			<View>
				<Text>0</Text>
			</View>
		</View>
	);
};

export default TokenItem;
