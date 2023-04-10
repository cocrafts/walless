import { Stack } from '@walless/gui';

import ModalWrapper from '../components/ModalWrapper';
import NavBtn from '../SendToken/components/NavBtn';

import AccountInfo from './AccountInfo';
import Header from './Header';
import RecipientInfo from './RecipientInfo';

const ConfirmTransactionScreen = () => {
	const networkLogo = '/img/explore/logo-solana.png';
	const networkName = 'Solana';
	const walletName = 'Wallet 1';
	const walletAddress = '0xfu439t279t0hfnjc...w0tuwnfqw';
	const tokenAmount = 30;
	const tokenName = 'SOL';

	return (
		<ModalWrapper>
			<Stack width="100%">
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
			</Stack>

			<NavBtn content="Continue" route="transaction-successful" />
		</ModalWrapper>
	);
};

export default ConfirmTransactionScreen;
