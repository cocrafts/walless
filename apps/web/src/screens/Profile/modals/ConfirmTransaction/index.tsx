import { FC, useEffect, useState } from 'react';
import { getWalletPublicKey, modalActions, ModalConfigs } from '@walless/app';
import { Networks } from '@walless/core';
import { Stack } from '@walless/ui';
import { transactionActions } from 'state/transaction';

import ModalWrapper from '../components/ModalWrapper';
import { walletName } from '../internal';
import NavBtn from '../SendToken/components/NavBtn';
import { DropdownItemProps } from '../SendToken/internal';

import AccountInfo from './AccountInfo';
import Header from './Header';
import RecipientInfo from './RecipientInfo';

interface RequiredContext {
	token: DropdownItemProps;
	network: DropdownItemProps;
	receiver: string;
	amount: number;
	parent: {
		id: string;
	};
}

interface Props {
	config: ModalConfigs & { id: string; context: RequiredContext };
}

const ConfirmTransactionScreen: FC<Props> = ({ config }) => {
	const { token, network, receiver, amount, parent } = config.context;

	const handleOnPressGoBackBtn = () => {
		modalActions.hide(config.id);
	};

	const handleOnPressCloseBtn = () => {
		modalActions.hide(config.id);

		if (parent) {
			modalActions.hide(parent.id);
		}
	};

	const handleContinuePress = () => {
		if (!address) return;

		transactionActions.createAndSend({
			sender: address,
			token: token.value,
			network: network.value as Networks,
			receiver,
			amount,
		});
	};

	const [address, setAddress] = useState<string>();

	useEffect(() => {
		(async () => {
			setAddress(await getWalletPublicKey(network.value as Networks));
		})();
	}, []);

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
					networkLogo={network.icon as string}
					networkName={network.name}
					walletName={walletName}
					walletAddress={
						address ? address.substring(0, 30) + '...' : 'Loading ...'
					}
				/>
			</Stack>

			<Stack>
				<RecipientInfo
					networkLogo={network.icon as string}
					networkName={network.name}
					walletAddress={receiver}
					tokenAmount={amount}
					tokenName={token.name}
				/>
			</Stack>

			<Stack marginTop="auto" marginHorizontal="auto">
				<NavBtn content="Continue" route="" onPress={handleContinuePress} />
			</Stack>
		</ModalWrapper>
	);
};

export default ConfirmTransactionScreen;
