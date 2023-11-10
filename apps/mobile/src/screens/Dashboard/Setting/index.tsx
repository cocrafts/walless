import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import SettingFeature from '@walless/app/features/Setting';
import { navigate, type ProfileParamList } from 'utils/navigation';

type Props = StackScreenProps<ProfileParamList, 'Setting'>;

export const SettingScreen: FC<Props> = () => {
	const handleGoBack = () => {
		navigate('Dashboard', {
			screen: 'Profile',
			params: {
				screen: 'ProfileDashboard',
			},
		});
	};

	return <SettingFeature onBack={handleGoBack} />;
};

export default SettingScreen;
