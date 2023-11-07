import type { FC } from 'react';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { WidgetFeature } from '@walless/app';
import type { HomeParamList } from 'utils/navigation';

type Props = DrawerScreenProps<HomeParamList, 'Widget'>;

export const WidgetScreen: FC<Props> = ({ route }) => {
	return <WidgetFeature id={route.name} />;
};

export default WidgetScreen;
