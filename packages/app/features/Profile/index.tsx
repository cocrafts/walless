import { StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { View } from '@walless/gui';
import { utils } from '@walless/ioc';

import { MainFeatureButtons } from '../../components/MainFeatureButtons';
import { showReceiveModal, showSendModal } from '../../utils/modal';

import Collectibles from './components/Collectibles';
import TokenValue from './components/TokenValue';
import TransactionHistory from './components/TransactionHistory';
import Widgets from './components/Widgets';

export const ProfileFeature = () => {
	const handleSend = () => {
		showSendModal();
	};

	return (
		<View style={styles.container}>
			<View style={styles.widgetContainer}>
				<Widgets />
			</View>

			<TokenValue />

			<MainFeatureButtons
				onSendPress={handleSend}
				onReceivePress={() => showReceiveModal(Networks.solana)}
				onBuyPress={() => utils.buyToken(Networks.solana)}
			/>

			<Collectibles />

			<TransactionHistory />
		</View>
	);
};

export default ProfileFeature;
export * from './components/TransactionHistory';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 14,
		paddingVertical: 16,
		alignItems: 'center',
		gap: 36,
	},
	widgetContainer: {
		alignSelf: 'flex-end',
		marginBottom: -12,
	},
});
