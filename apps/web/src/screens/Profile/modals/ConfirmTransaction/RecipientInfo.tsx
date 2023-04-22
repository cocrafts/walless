import { FC } from 'react';
import { Stack, Text } from '@walless/ui';

import InfoItemDivider from '../components/InfoItemDivider';
import InfoKeyValue from '../components/InfoKeyValue';
import InfoWrapper from '../components/InfoWrapper';

interface Props {
	walletAddress: string;
	networkName: string;
	networkLogo: string;
	tokenAmount: number;
	tokenName: string;
}

const RecipientInfo: FC<Props> = ({
	walletAddress,
	networkName,
	networkLogo,
	tokenAmount,
	tokenName,
}) => {
	return (
		<Stack>
			<Text fontWeight="500" marginBottom={16}>
				Recipient Information
			</Text>

			<InfoWrapper>
				<Stack>
					<InfoKeyValue infoKey="Address" infoValue={walletAddress} />

					<InfoItemDivider />

					<InfoKeyValue
						infoKey="Network"
						infoValue={networkName}
						infoValueLogo={networkLogo}
					/>

					<InfoItemDivider />

					<InfoKeyValue
						infoKey="Amount"
						infoValue={`${tokenAmount} ${tokenName}`}
					/>
				</Stack>
			</InfoWrapper>
		</Stack>
	);
};

export default RecipientInfo;
