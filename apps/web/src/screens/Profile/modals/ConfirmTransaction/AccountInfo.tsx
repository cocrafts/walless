import { FC } from 'react';
import { Stack, Text } from '@walless/ui';

import InfoWrapper from '../components/InfoWrapper';
import WalletInfo from '../components/WalletInfo';

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
				<Stack paddingVertical={16} paddingHorizontal={20}>
					<WalletInfo
						networkLogo={networkLogo}
						networkName={networkName}
						walletAddress={walletAddress}
						walletName={walletName}
					/>
				</Stack>
			</InfoWrapper>
		</Stack>
	);
};

export default AccountInfo;
