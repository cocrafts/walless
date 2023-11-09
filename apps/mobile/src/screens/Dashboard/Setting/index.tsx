import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import SettingFeature from '@walless/app/features/Setting';
import type { ProfileParamList } from 'utils/navigation';

type Props = StackScreenProps<ProfileParamList, 'Setting'>;

export const SettingScreen: FC<Props> = () => {
	return <SettingFeature />;
};

export default SettingScreen;
