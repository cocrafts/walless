import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { Hoverable, View } from '@walless/gui';
import { Setting } from '@walless/icons';
import { utils } from '@walless/ioc';

import { MainFeatureButtons } from '../../components/MainFeatureButtons';
import { showReceiveModal } from '../Receive';
import { showSendModal } from '../Send';

import TokenValue from './components/TokenValue';
import TransactionHistory from './components/TransactionHistory';

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
			<Hoverable style={styles.settingButton} onPress={onSettingPress}>
				<Setting size={14} color="white" />
			</Hoverable>

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
	settingButton: {
		alignSelf: 'flex-end',
		backgroundColor: '#25313D',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 0,
		width: 30,
		height: 30,
		borderRadius: 15,
	},
});

export * from './components/TransactionHistory';
