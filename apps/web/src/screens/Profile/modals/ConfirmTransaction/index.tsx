import { FC } from 'react';
import { modalActions, ModalConfigs } from '@walless/app';
import { Stack } from '@walless/gui';

import ModalWrapper from '../components/ModalWrapper';
import {
	networkLogo,
	networkName,
	tokenAmount,
	tokenName,
	walletAddress,
	walletName,
} from '../internal';
import NavBtn from '../SendToken/components/NavBtn';

import AccountInfo from './AccountInfo';
import Header from './Header';
import RecipientInfo from './RecipientInfo';

interface RequiredContext {
	token: string;
	network: string;
	receiver: string;
	amount: number;
	parent: {
		id: string;
	};
}

const ConfirmTransactionScreen: FC<{
	config: ModalConfigs & { context: RequiredContext };
}> = ({ config }) => {
	const handleOnPressGoBackBtn = () => {
		modalActions.destroy(config.id);
	};

	const handleOnPressCloseBtn = () => {
		modalActions.destroy(config.id);

		if (config.context.parent) {
			modalActions.destroy(config.context.parent.id);
		}
	};

	return (
		<ModalWrapper>
			<Stack>
				<Header
					onPressGoBackBtn={handleOnPressGoBackBtn}
					onPressCloseBtn={handleOnPressCloseBtn}
				/>
			</Stack>

			<Stack marginVertical={18}>
				<AccountInfo
					networkLogo={networkLogo}
					networkName={networkName}
					walletName={walletName}
					walletAddress={walletAddress}
				/>
			</Stack>

			<Stack>
				<RecipientInfo
					networkLogo={networkLogo}
					networkName={networkName}
					walletAddress={walletAddress}
					tokenAmount={tokenAmount}
					tokenName={tokenName}
				/>
			</Stack>

			<Stack marginTop="auto" marginHorizontal="auto">
				<NavBtn content="Continue" route="transaction-successful" />
			</Stack>
		</ModalWrapper>
	);
};

export default ConfirmTransactionScreen;
