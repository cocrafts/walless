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

const ConfirmTransactionScreen = () => {
	return (
		<ModalWrapper>
			<Stack marginHorizontal={20}>
				<Header />
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
