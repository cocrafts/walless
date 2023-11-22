import type { ViewStyle } from 'react-native';
import { ProfileFeature, useSafeAreaInsets } from '@walless/app';
import { tabBarHeight } from 'stacks/Dashboard/TabBar';
import { navigate } from 'utils/navigation';

export const ProfileScreen = () => {
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		paddingTop: insets.top,
		paddingBottom: tabBarHeight + insets.bottom,
	};

	const handleSettingPress = () => {
		navigate('Dashboard', {
			screen: 'Profile',
			params: {
				screen: 'Setting',
			},
		});
	};

	const handleNavigateToHistory = () => {
		navigate('Dashboard', {
			screen: 'Profile',
			params: {
				screen: 'History',
			},
		});
	};

	return (
		<ProfileFeature
			style={containerStyle}
			onSettingPress={handleSettingPress}
			onNavigateToHistory={handleNavigateToHistory}
		/>
	);
};

export default ProfileScreen;
