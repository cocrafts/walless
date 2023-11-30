import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from '@walless/app';
import { SettingFeature } from '@walless/app';
import { tabBarHeight } from 'stacks/Dashboard/TabBar';
import { navigate, type ProfileParamList } from 'utils/navigation';

type Props = StackScreenProps<ProfileParamList, 'Setting'>;

export const SettingScreen: FC<Props> = () => {
	const insets = useSafeAreaInsets();
	const scrollContainerStyle: ViewStyle = {
		paddingTop: insets.top,
		paddingBottom: tabBarHeight + insets.bottom,
	};

	const handleGoBack = () => {
		navigate('Dashboard', {
			screen: 'Profile',
			params: {
				screen: 'ProfileDashboard',
			},
		});
	};

	return (
		<SettingFeature
			scrollContentContainerStyle={scrollContainerStyle}
			onBack={handleGoBack}
		/>
	);
};

export default SettingScreen;
