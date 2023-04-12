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

const ConfirmTransactionScreen: FC<{ config: ModalConfigs }> = ({ config }) => {
	const handleOnPressGoBackBtn = () => {
		modalActions.destroy(config.id);
	};

	const handleOnPressCloseBtn = () => {
		modalActions.destroy(config.id);

		const parent = (config.context as { parent: { id: string } }).parent;

		if (parent) {
			modalActions.destroy(parent.id);
		}
	};

	return (
		<ModalWrapper>
			<Stack marginHorizontal={20}>
				<Header
					onPressGoBackBtn={handleOnPressGoBackBtn}
					onPressCloseBtn={handleOnPressCloseBtn}
				/>
			</Stack>

			<Stack margin={36}>
				<AccountInfo
					networkLogo={networkLogo}
					networkName={networkName}
					walletName={walletName}
					walletAddress={walletAddress}
				/>
			</Stack>

			<Stack marginHorizontal={36}>
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
