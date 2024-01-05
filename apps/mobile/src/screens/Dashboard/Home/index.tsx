import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Networks } from '@walless/core';
import { utils } from '@walless/ioc';
import FeatureButtons from 'components/FeatureButtons.tsx';
import { floatActions } from 'modals';
import { tabBarHeight } from 'utils';
import { useSafeAreaInsets, useTokens } from 'utils/hooks';
import { navigate } from 'utils/navigation';

import TokenValue from './components/TokenValue';
import TransactionHistory from './components/TransactionHistory';

export const ProfileScreen = () => {
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		paddingBottom: tabBarHeight + insets.bottom,
	};

	const { valuation } = useTokens();

	const handleSend = () => {
		floatActions.showSendTokenModal({});
	};

	const handleNavigateToHistory = () => {
		navigate('Dashboard', {
			screen: 'Home',
			params: {
				screen: 'History',
			},
		});
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<TokenValue value={valuation} />

			<FeatureButtons
				onSendPress={handleSend}
				onReceivePress={() => floatActions.showReceiveModal({})}
				onBuyPress={() => utils.buyToken(Networks.solana)}
			/>

			<TransactionHistory onNavigateToHistory={handleNavigateToHistory} />
		</View>
	);
};

export default ProfileScreen;

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
