import { type FC } from 'react';
import {
	type ModalConfigs,
	AnimateDirections,
	BindDirections,
	modalActions,
} from '@walless/gui';
import { ArrowDown } from '@walless/icons';
import { Stack, Text } from '@walless/ui';
import { type TransactionPayload } from 'state/transaction/send';

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

	const handleClose = () => {
		modalActions.hide(config.id as string);
	};

	const handleOtherTransaction = () => {
		handleClose();
		modalActions.show({
			id: 'send-token',
			bindingDirection: BindDirections.InnerBottom,
			component: SendTokenScreen,
			animateDirection: AnimateDirections.Top,
		});
	};

	return (
		<ModalWrapper>
			<Header onClose={handleClose} />

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
								networkLogo={networkData?.icon as string}
								networkName={networkData?.name as string}
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
									infoValue={networkData?.name as string}
									infoValueLogo={networkData?.icon as string}
								/>
							</InfoWrapper>
						</Stack>
					</InfoWrapper>
				</Stack>
			</Stack>

			<Footer
				onClosePress={handleClose}
				onOtherTransactionPress={handleOtherTransaction}
			/>
		</ModalWrapper>
	);
};

export default TransactionSuccessfulScreen;
