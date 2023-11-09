import { View } from 'react-native';
import { useSafeAreaInsets } from '@walless/app';
import { ProfileFeature } from '@walless/app/features/Profile';
import { navigate } from 'utils/navigation';

export const ProfileScreen = () => {
	const { top } = useSafeAreaInsets();

	const containerStyle = {
		paddingTop: top,
		flex: 1,
	};

	const handleSettingPress = () => {
		navigate('Dashboard', {
			screen: 'Profile',
			params: {
				screen: 'Setting',
			},
		});
	};

	return (
		<View style={containerStyle}>
			<ProfileFeature onSettingPress={handleSettingPress} />
		</View>
	);
};

export default ProfileScreen;
