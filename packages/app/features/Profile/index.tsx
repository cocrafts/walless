import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { View } from '@walless/gui';
import { utils } from '@walless/ioc';

import { MainFeatureButtons } from '../../components/MainFeatureButtons';
import { showReceiveModal } from '../Receive';
import { showSendModal } from '../Send';

import TokenValue from './components/TokenValue';
import TransactionHistory from './components/TransactionHistory';
import Widgets from './components/Widgets';

interface Props {
	style: StyleProp<ViewStyle>;
	onNavigateToHistory: () => void;
	onSettingPress?: () => void;
}

export const ProfileFeature: FC<Props> = ({
	style,
	onNavigateToHistory,
	onSettingPress,
}) => {
	const handleSend = () => {
		showSendModal();
	};

	return (
		<View style={[styles.container, style]}>
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
		marginVertical: 16,
		alignItems: 'center',
		gap: 36,
	},
	widgetContainer: {
		alignSelf: 'flex-end',
		marginBottom: -12,
	},
});

export * from './components/TransactionHistory';
