import type { ViewStyle } from 'react-native';
import { ProfileFeature, useSafeAreaInsets } from '@walless/app';
import { tabBarHeight } from 'stacks/Dashboard/TabBar';
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
