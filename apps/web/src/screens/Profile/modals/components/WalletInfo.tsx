import type { FC } from 'react';
import { Image, Stack, Text } from '@walless/ui';

interface Props {
	networkLogo: string;
	networkName: string;
	walletName: string;
	walletAddress: string;
}

const WalletInfo: FC<Props> = ({
	networkLogo,
	networkName,
	walletName,
	walletAddress,
}) => {
	return (
		<Stack display="flex" flexDirection="row" gap={16} alignItems="center">
			<Stack borderRadius="100%" overflow="hidden">
				<Image src={networkLogo} width={35} height={35} />
			</Stack>

			<Stack display="flex" gap={2}>
				<Text fontSize={14} fontWeight="600">
					{walletName} ({networkName})
				</Text>
				<Text fontSize={12} fontWeight="500" color="#566674">
					{walletAddress}
				</Text>
			</Stack>
		</Stack>
	);
};

export default WalletInfo;
