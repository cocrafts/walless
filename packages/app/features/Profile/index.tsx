import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Networks } from '@walless/core';
import { View } from '@walless/gui';
import { utils } from '@walless/ioc';

import { MainFeatureButtons } from '../../components/MainFeatureButtons';
import { floatActions } from '../../state';
import { useTokens } from '../../utils/hooks';
import { showReceiveModal } from '../Receive';

import TokenValue from './components/TokenValue';
import TransactionHistory from './components/TransactionHistory';

interface Props {
	style?: StyleProp<ViewStyle>;
	onNavigateToHistory: () => void;
}

export const ProfileFeature: FC<Props> = ({ style, onNavigateToHistory }) => {
	const { valuation } = useTokens();

	const handleSend = () => {
		floatActions.showSendTokenModal();
	};

	return (
		<View style={[styles.container, style]}>
			<TokenValue value={valuation} />

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
