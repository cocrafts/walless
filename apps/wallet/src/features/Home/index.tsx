import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Networks } from '@walless/core';
import { Button, View } from '@walless/gui';
import { Setting } from '@walless/icons';
import FeatureButtons from 'components/FeatureButtons';
import { showReceiveModal } from 'modals/Receive';
import { showSendTokenModal } from 'modals/SendToken';
import { appState } from 'state/app';
import { buyToken } from 'utils/buy';
import { tabBarHeight } from 'utils/constants';
import { useSnapshot, useTokens } from 'utils/hooks';
import { navigate } from 'utils/navigation';

import History from './History';
import TokenValue from './TokenValue';

const ProfileFeature = () => {
	const insets = useSafeAreaInsets();
	const { isMobileDisplay } = useSnapshot(appState);
	const { valuation } = useTokens();
	const containerStyle: ViewStyle = {
		paddingBottom: tabBarHeight + insets.bottom,
	};
	const handleSettingPress = () => {
		navigate('Dashboard', {
			screen: 'Explore',
			params: {
				screen: 'Profile',
				params: {
					screen: 'Setting',
				},
			},
		});
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<View>
				{!isMobileDisplay && (
					<View style={styles.widgetContainer}>
						<Button style={styles.settingBtn} onPress={handleSettingPress}>
							<Setting size={14} color="#ffffff" />
						</Button>
					</View>
				)}
				<TokenValue value={valuation} />
			</View>

			<FeatureButtons
				style={styles.featureBtnGroup}
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
		gap: 36,
	},
	widgetContainer: {
		alignSelf: 'flex-end',
	},
	settingBtn: {
		backgroundColor: '#25313d',
		borderWidth: 1,
		paddingHorizontal: 0,
		paddingVertical: 0,
		width: 30,
		height: 30,
	},
	featureBtnGroup: {
		alignSelf: 'center',
	},
});
