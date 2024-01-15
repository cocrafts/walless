import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Networks } from '@walless/core';
import { View } from '@walless/gui';
import FeatureButtons from 'components/FeatureButtons';
import { useTokens } from 'hooks';
import { showReceiveModal } from 'modals/Receive';
import { showSendTokenModal } from 'modals/SendToken';
import { buyToken } from 'utils/buy';
import { tabBarHeight } from 'utils/constants';

import History from './History';
import TokenValue from './TokenValue';

const ProfileFeature = () => {
	const insets = useSafeAreaInsets();
	const { valuation } = useTokens();
	const containerStyle: ViewStyle = {
		paddingBottom: tabBarHeight + insets.bottom,
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<TokenValue value={valuation} />

			<FeatureButtons
				onSendPress={() => showSendTokenModal({})}
				onReceivePress={() => showReceiveModal({})}
				onBuyPress={() => buyToken(Networks.solana)}
			/>

			<History />
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
