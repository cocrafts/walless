import { FC } from 'react';
import { shortenAddress } from '@walless/core';
import { Image, Stack, Text } from '@walless/gui';
import { PublicKeyRecord } from '@walless/storage';
import { getNetworkInfo } from 'utils/helper';

interface Props {
	item: PublicKeyRecord;
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
			<Image src={network.icon} width={30} height={30} borderRadius={10000} />

			<Stack>
				<Text fontSize={14}>
					Wallet {index + 1} ({network.name})
				</Text>
				<Text fontSize={12} color="#566674">
					{shortenAddress(item.id)}
				</Text>
			</Stack>
		</Stack>
	);
};

export default Wallet;
