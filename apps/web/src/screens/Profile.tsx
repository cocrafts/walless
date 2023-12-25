import { StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import {
	ProfileFeature,
	StackHeader,
	universalActions,
	useResponsive,
	useUniversalInsets,
} from '@walless/app';
import { Hoverable, View } from '@walless/gui';
import { Setting } from '@walless/icons';
import { router } from 'utils/routing';

export const ProfileScreen = () => {
	const scrollOffset = useSharedValue(60);
	const { isMobileResponsive } = useResponsive();
	const insets = useUniversalInsets();
	const handleNavigateToHistory = () => {
		router.navigate('/history');
	};

	const handleSettingPress = () => {
		router.navigate('/setting');
	};

	return (
		<View style={styles.container}>
			{isMobileResponsive && (
				<StackHeader
					title="Profile"
					insets={insets}
					onToggleDrawer={() => universalActions.toggleDrawer()}
					scrollOffset={scrollOffset}
				/>
			)}
			<Hoverable style={styles.settingContainer} onPress={handleSettingPress}>
				<Setting size={16} />
			</Hoverable>
			<ProfileFeature onNavigateToHistory={handleNavigateToHistory} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	settingContainer: {
		marginLeft: 'auto',
		marginRight: 14,
		marginTop: 14,
		backgroundColor: '#25313D',
		padding: 8,
		borderRadius: 100,
	},
});

export default ProfileScreen;
