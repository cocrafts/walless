import { FC, useEffect, useState } from 'react';
import {
	BindDirections,
	getWalletPublicKey,
	modalActions,
	ModalConfigs,
} from '@walless/app';
import { constructTransaction } from '@walless/app';
import { Networks } from '@walless/core';
import { Stack } from '@walless/gui';
import { requestSignAndSendTransaction } from 'bridge/listeners';

import ModalWrapper from '../components/ModalWrapper';
import { walletName } from '../internal';
import NavBtn from '../SendToken/components/NavBtn';
import { DropdownItemProps } from '../SendToken/internal';
import TransactionSuccessfulScreen from '../TransactionSuccessful';

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
	config: ModalConfigs & { context: RequiredContext };
}

const ConfirmTransactionScreen: FC<Props> = ({ config }) => {
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
				<NavBtn
					content="Continue"
					route=""
					onPress={async () => {
						if (address) {
							const transaction = await constructTransaction({
								sender: address,
								amount,
								network: network.value as Networks,
								receiver,
								token: token.value as string,
							});

							const res = await requestSignAndSendTransaction(transaction);

							if (res?.signatureString) {
								modalActions.show({
									id: 'transaction-successfully',
									bindingDirection: BindDirections.InnerBottom,
									component: TransactionSuccessfulScreen as never,
									context: {
										sender: address,
										receiver,
										token,
										network,
										amount,
										signatureString: res.signatureString,
									},
								});
								handleOnPressCloseBtn();
							}
						}
					}}
				/>
			</Stack>
		</ModalWrapper>
	);
};

export default ConfirmTransactionScreen;
