import { FC } from 'react';
import { shortenAddress } from '@walless/core';
import { PublicKeyDocument } from '@walless/store';
import { Image, Stack, Text } from '@walless/ui';
import { getNetworkInfo } from 'utils/helper';

interface Props {
	item: PublicKeyDocument;
	index: number;
}

const Wallet: FC<Props> = ({ item, index }) => {
	const network = getNetworkInfo(item.network);

	return (
		<Stack
			backgroundColor="#0E141A"
			width="100%"
			borderRadius={16}
			padding={12}
			flexDirection="row"
			gap={10}
			cursor="pointer"
			hoverStyle={{ backgroundColor: '#202D38' }}
		>
			<Image
				src={network?.icon as never}
				width={30}
				height={30}
				borderRadius={10000}
			/>

			<Stack>
				<Text fontSize={14}>
					Wallet {index + 1} ({network?.name})
				</Text>
				<Text fontSize={12} color="#566674">
					{shortenAddress(item._id)}
				</Text>
			</Stack>
		</Stack>
	);
};

export default Wallet;
