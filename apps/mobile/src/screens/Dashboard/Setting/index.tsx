import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { SettingFeature } from '@walless/app';
import type { DashboardParamList } from 'utils/navigation';

type Props = StackScreenProps<DashboardParamList, 'Setting'>;

export const SettingScreen: FC<Props> = () => {
	return <SettingFeature />;
};

export default SettingScreen;
