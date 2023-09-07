import type { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { WidgetFeature } from '@walless/app';
import type { HomeParamList } from 'utils/navigation';

type Props = StackScreenProps<HomeParamList, 'Widget'>;

export const WidgetScreen: FC<Props> = ({ route }) => {
	return <WidgetFeature id={route.params?.id} />;
};

export default WidgetScreen;
