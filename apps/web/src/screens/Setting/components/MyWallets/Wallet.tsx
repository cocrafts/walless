import { FC } from 'react';
import { Image, Stack, Text } from '@walless/gui';
import { Wallet } from 'screens/Setting/internal';

const Wallet: FC<Wallet> = ({ icon, name, network, address }) => {
	return (
		<Stack
			backgroundColor="#0E141A"
			width="100%"
			borderRadius={16}
			padding={12}
			flexDirection="row"
			gap={10}
			cursor="pointer"
			hoverStyle={{
				backgroundColor: '#202D38',
			}}
		>
			<Image src={icon} width={30} height={30} borderRadius={10000} />

			<Stack>
				<Text fontSize={14}>
					{name} ({network})
				</Text>
				<Text fontSize={12} color="#566674">
					{address}
				</Text>
			</Stack>
		</Stack>
	);
};

export default Wallet;
