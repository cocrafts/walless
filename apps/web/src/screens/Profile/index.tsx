import { MainFeatures } from '@walless/app';
import { Networks } from '@walless/core';
import { Stack } from '@walless/ui';
import { appActions } from 'state/app';
import { showReceiveModal } from 'state/app/modal';
import { onrampWithGateFi } from 'utils/gatefi';

import Collectibles from './components/Collectibles';
import History from './components/History';
import TokenValue from './components/TokenValue';
import Widgets from './components/Widgets';

const ProfileScreen = () => {
	const handleSend = () => {
		appActions.showSendModal();
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

			<MainFeatures
				onSendPress={handleSend}
				onReceivePress={() => showReceiveModal(Networks.sui)}
				onBuyPress={onrampWithGateFi}
			/>

			<Collectibles />

			<History />
		</Stack>
	);
};

export default ProfileScreen;
