import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { appState } from '@walless/engine';
import { Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import AccountInfo from './components/AccountInfo';
import Delimiter from './components/Delimiter';
import FollowUs from './components/FollowUs';
import HelpCenter from './components/HelpCenter';
import LogOut from './components/LogOut';
import MyWallets from './components/MyWallets';
import PageTitle from './components/PageTitle';

interface Props {
	style?: StyleProp<ViewStyle>;
	onBack?: () => void;
}

export const SettingFeature: FC<Props> = ({ style, onBack }) => {
	const { profile } = useSnapshot(appState);

	return (
		<View style={[styles.container, style]}>
			{onBack && <PageTitle onBack={onBack} />}
			<View style={styles.contentContainer}>
				<AccountInfo profile={profile} />
				<Delimiter />
				<View style={styles.innerContainer}>
					<MyWallets />
					<View>
						<Text style={styles.text}>Settings</Text>
						<View style={styles.settingContainer}>
							<HelpCenter />
							<LogOut />
						</View>
					</View>
					<FollowUs />
				</View>
			</View>
		</View>
	);
};

export default SettingFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 14,
		paddingBottom: 28,
	},
	contentContainer: {
		flex: 1,
		paddingTop: 18,
	},
	text: {
		color: '#566674',
		marginBottom: 4,
	},
	settingContainer: {
		gap: 8,
	},
	innerContainer: {
		gap: 16,
	},
});
