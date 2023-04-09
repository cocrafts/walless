import { FC } from 'react';
import { Image, Stack, Text } from '@walless/gui';

import InfoWrapper from '../components/InfoWrapper';

interface Props {
	networkLogo: string;
	networkName: string;
	walletName: string;
	walletAddress: string;
}

const AccountInfo: FC<Props> = ({
	networkLogo,
	networkName,
	walletName,
	walletAddress,
}) => {
	return (
		<Stack>
			<Text fontWeight="500" marginBottom={16}>
				From Account
			</Text>

			<InfoWrapper>
				<Stack
					display="flex"
					flexDirection="row"
					gap={16}
					alignItems="center"
					paddingVertical={16}
					paddingHorizontal={20}
				>
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
			</InfoWrapper>
		</Stack>
	);
};

export default AccountInfo;
