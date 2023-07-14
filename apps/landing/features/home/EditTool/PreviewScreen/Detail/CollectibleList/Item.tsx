import type { FC } from 'react';
import type { MetadataDocument } from '@walless/store';
import { Image, Stack, Text } from '@walless/ui';

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
		<Stack
			padding={12}
			backgroundColor={'#131C24'}
			alignItems="center"
			gap={10}
			borderRadius={10}
		>
			<Image
				src={iconSource}
				width={imgSize}
				height={imgSize}
				backgroundColor={'#0B1218'}
				borderRadius={10}
			/>

			<Stack alignItems="center">
				<Text fontSize={16} fontWeight={'500'}>
					{`${name?.slice(0, 10)}...`}
				</Text>
				<Text color={'#566674'} fontSize={13} fontWeight={'400'}>
					40
				</Text>
			</Stack>
		</Stack>
	);
};

export default CollectibleItem;
