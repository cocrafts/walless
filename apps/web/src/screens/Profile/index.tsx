import { MainFeatureButtons } from '@walless/app';
import TransactionHistory from '@walless/app/features/Widget/components/TransactionHistory';
import { showSendModal } from '@walless/app/utils';
import { showReceiveModal } from '@walless/app/utils';
import { Networks } from '@walless/core';
import { Stack } from '@walless/ui';
import { onrampWithGateFi } from 'utils/gatefi';
import { router } from 'utils/routing';

import Collectibles from './components/Collectibles';
import TokenValue from './components/TokenValue';
import Widgets from './components/Widgets';

const ProfileScreen = () => {
	const handleSend = () => {
		showSendModal();
	};

	const handleNavigateToHistory = () => {
		router.navigate('/history');
	};

	return (
		<Stack
			maxHeight="100vh"
			paddingHorizontal={14}
			paddingVertical={16}
			alignItems="center"
			gap={36}
		>
			<Stack alignSelf="flex-end" marginBottom={-12}>
				<Widgets />
			</Stack>

			<TokenValue />

			<MainFeatureButtons
				onSendPress={handleSend}
				onReceivePress={() => showReceiveModal(Networks.solana)}
				onBuyPress={onrampWithGateFi}
			/>

			<Collectibles />

			<TransactionHistory onNavigateToHistory={handleNavigateToHistory} />
		</Stack>
	);
};

export default ProfileScreen;
