import { FC, useEffect, useState } from 'react';
import {
	getWalletPublicKey,
	modalActions,
	ModalConfigs,
	sendToken,
} from '@walless/app';
import { Networks } from '@walless/core';
import { Stack } from '@walless/gui';

import ModalWrapper from '../components/ModalWrapper';
import {
	// networkLogo,
	// networkName,
	// tokenAmount,
	// tokenName,
	walletAddress,
	walletName,
} from '../internal';
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

const ConfirmTransactionScreen: FC<{
	config: ModalConfigs & { context: RequiredContext };
}> = ({ config }) => {
	const { token, network, receiver, amount, parent } = config.context;

	const handleOnPressGoBackBtn = () => {
		modalActions.destroy(config.id);
	};

	const handleOnPressCloseBtn = () => {
		modalActions.destroy(config.id);

		if (parent) {
			modalActions.destroy(parent.id);
		}
	};

	const [address, setAddress] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			setAddress((await getWalletPublicKey(network.value as Networks)) || null);
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
				<NavBtn content="Continue" route="" />
			</Stack>
		</ModalWrapper>
	);
};

export default ConfirmTransactionScreen;
