import { MainFeatureButtons } from '@walless/app';
import { showSendModal } from '@walless/app/utils';
import { Networks } from '@walless/core';
import { Stack } from '@walless/ui';
import { showReceiveModal } from 'state/app/modal';
import { onrampWithGateFi } from 'utils/gatefi';

import Collectibles from './components/Collectibles';
import TokenValue from './components/TokenValue';
import TransactionHistory from './components/TransactionHistory';
import Widgets from './components/Widgets';

const ProfileScreen = () => {
	const handleSend = () => {
		showSendModal();
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
				onReceivePress={() => showReceiveModal(Networks.sui)}
				onBuyPress={onrampWithGateFi}
			/>

			<Collectibles />

			<TransactionHistory />
		</Stack>
	);
};

export default ProfileScreen;
