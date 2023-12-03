import type { ViewStyle } from 'react-native';
import { ProfileFeature, tabBarHeight, useSafeAreaInsets } from '@walless/app';
import { navigate } from 'utils/navigation';

export const ProfileScreen = () => {
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		paddingBottom: tabBarHeight + insets.bottom,
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
		<ProfileFeature
			style={containerStyle}
			onNavigateToHistory={handleNavigateToHistory}
		/>
	);
};

export default ProfileScreen;
