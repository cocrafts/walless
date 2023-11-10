import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { View } from '@walless/gui';
import { utils } from '@walless/ioc';

import { MainFeatureButtons } from '../../components/MainFeatureButtons';
import { useSafeAreaInsets } from '../../utils/hooks';
import { showReceiveModal, showSendModal } from '../../utils/modal';

import TokenValue from './components/TokenValue';
import TransactionHistory from './components/TransactionHistory';
import Widgets from './components/Widgets';

interface Props {
	onNavigateToHistory: () => void;
	onSettingPress?: () => void;
}

export const ProfileFeature: FC<Props> = ({
	onNavigateToHistory,
	onSettingPress,
}) => {
	const { top } = useSafeAreaInsets();

	const containerStyle = {
		paddingTop: top,
	};

	const handleSend = () => {
		showSendModal();
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<View style={styles.widgetContainer}>
				<Widgets onSettingPress={onSettingPress} />
			</View>

			<TokenValue />

			<MainFeatureButtons
				onSendPress={handleSend}
				onReceivePress={() => showReceiveModal(Networks.solana)}
				onBuyPress={() => utils.buyToken(Networks.solana)}
			/>

			<TransactionHistory onNavigateToHistory={onNavigateToHistory} />
		</View>
	);
};

export default ProfileFeature;

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

export * from './components/TransactionHistory';
