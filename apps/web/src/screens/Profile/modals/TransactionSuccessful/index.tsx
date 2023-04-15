import { FC } from 'react';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	ModalConfigs,
} from '@walless/app';
import { Stack, Text } from '@walless/gui';
import { ArrowDown } from '@walless/icons';
import { TransactionPayload } from 'state/transaction/send';

import InfoItemDivider from '../components/InfoItemDivider';
import InfoKeyValue from '../components/InfoKeyValue';
import InfoWrapper from '../components/InfoWrapper';
import ModalWrapper from '../components/ModalWrapper';
import WalletInfo from '../components/WalletInfo';
import { walletName } from '../internal';
import SendTokenScreen from '../SendToken';
import { networks, tokens } from '../SendToken/internal';

import Footer from './Footer';
import Header from './Header';
import ShareBtn from './ShareBtn';

interface Props {
	config: ModalConfigs & { context: TransactionPayload };
}

const TransactionSuccessfulScreen: FC<Props> = ({ config }) => {
	const { sender, receiver, amount, token, network } = config.context;

	const tokenData = tokens.find((ele) => ele.value === (token as unknown));
	const networkData = networks.find(
		(ele) => ele.value === (network as unknown),
	);

	const handleOnCloseBtn = () => {
		modalActions.hide(config.id as string);
	};

	const handleOnOtherTransactionBtn = () => {
		handleOnCloseBtn();
		modalActions.show({
			id: 'send-token',
			bindingDirection: BindDirections.InnerBottom,
			component: SendTokenScreen,
			animateDirection: AnimateDirections.Top,
		});
	};

	return (
		<ModalWrapper>
			<Header onClose={handleOnCloseBtn} />

			<Stack>
				<Text
					marginTop={28}
					marginBottom={12}
					marginHorizontal="auto"
					fontSize={40}
					fontWeight="500"
				>
					{amount} {tokenData?.value}
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

				<Stack>
					<InfoWrapper>
						<Stack padding={16}>
							<WalletInfo
								networkLogo={networkData?.icon || ''}
								networkName={networkData?.name || ''}
								walletAddress={
									sender ? sender.substring(0, 30) + '...' : 'Loading ...'
								}
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
								<InfoKeyValue infoKey="Address" infoValue={receiver} />
								<InfoItemDivider />
								<InfoKeyValue
									infoKey="Network"
									infoValue={networkData?.name || ''}
									infoValueLogo={networkData?.icon || ''}
								/>
							</InfoWrapper>
						</Stack>
					</InfoWrapper>
				</Stack>
			</Stack>

			<Footer
				onClose={handleOnCloseBtn}
				onOtherTransactionBtn={handleOnOtherTransactionBtn}
			/>
		</ModalWrapper>
	);
};

export default TransactionSuccessfulScreen;
