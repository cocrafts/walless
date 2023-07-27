import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { shortenAddress } from '@walless/core';
import type { MetadataDocument } from '@walless/store';
import { Image, Stack, Text } from '@walless/ui';

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
		<Stack
			flexDirection="row"
			backgroundColor={'#131C24'}
			paddingVertical={10}
			paddingHorizontal={12}
		>
			<Stack
				width={iconSize}
				height={iconSize}
				borderRadius={iconSize / 2}
				backgroundColor={'#202634'}
				alignItems="center"
				justifyContent="center"
			>
				<Image
					src={iconSource}
					width={iconSize}
					height={iconSize}
					borderRadius={iconSize / 2}
					resizeMode="cover"
				/>
			</Stack>
			<Stack flex={1} paddingVertical={4} paddingHorizontal={12}>
				<Text fontWeight={'500'}>{symbol || name || shortenAddress(_id)}</Text>
			</Stack>
			<Stack paddingVertical={4}>
				<Text fontWeight={'500'}>0</Text>
			</Stack>
		</Stack>
	);
};

export default TokenItem;
