import { Stack, Text } from '@walless/gui';
import { ArrowDown } from '@walless/icons';

import InfoItemDivider from '../components/InfoItemDivider';
import InfoKeyValue from '../components/InfoKeyValue';
import InfoWrapper from '../components/InfoWrapper';
import ModalWrapper from '../components/ModalWrapper';
import WalletInfo from '../components/WalletInfo';
import {
	networkLogo,
	networkName,
	tokenAmount,
	tokenName,
	walletAddress,
	walletName,
} from '../internal';

import Footer from './Footer';
import Header from './Header';
import ShareBtn from './ShareBtn';

const TransactionSuccessfulScreen = () => {
	return (
		<ModalWrapper>
			<Header />

			<Stack>
				<Text
					marginTop={28}
					marginBottom={12}
					marginHorizontal="auto"
					fontSize={40}
					fontWeight="500"
				>
					{tokenAmount} {tokenName}
				</Text>

				<Stack marginHorizontal="auto">
					<ShareBtn />
				</Stack>

				<Stack
					marginVertical={20}
					width="100%"
					height={1}
					backgroundColor="#56667433"
				/>

				<Stack paddingHorizontal={36}>
					<InfoWrapper>
						<Stack padding={16}>
							<WalletInfo
								networkLogo={networkLogo}
								networkName={networkName}
								walletAddress={walletAddress}
								walletName={walletName}
							/>
						</Stack>

						<Stack paddingHorizontal={6} paddingBottom={6}>
							<Stack
								backgroundColor="#07415A"
								borderWidth={1}
								borderColor="#0181BA"
								borderRadius="100%"
								width={30}
								height={30}
								alignItems="center"
								justifyContent="center"
								marginHorizontal="auto"
								position="relative"
								y="50%"
							>
								<ArrowDown size={16} />
							</Stack>

							<InfoWrapper backgroundColor="#56667433">
								<InfoKeyValue infoKey="Address" infoValue={walletAddress} />
								<InfoItemDivider />
								<InfoKeyValue
									infoKey="Network"
									infoValue={networkName}
									infoValueLogo={networkLogo}
								/>
							</InfoWrapper>
						</Stack>
					</InfoWrapper>
				</Stack>
			</Stack>

			<Footer />
		</ModalWrapper>
	);
};

export default TransactionSuccessfulScreen;
