import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { View } from '@walless/gui';
import HistoryFeature from 'features/History';
import { tabBarHeight } from 'utils/constants';
import { useSafeAreaInsets } from 'utils/hooks';
import type { HomeParamList } from 'utils/navigation';

type Props = StackScreenProps<HomeParamList, 'History'>;

export const HistoryScreen: FC<Props> = () => {
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		paddingBottom: tabBarHeight + insets.bottom,
		paddingHorizontal: 8,
	};

	return (
		<View style={containerStyle}>
			<HistoryFeature />
		</View>
	);
};

export default HistoryScreen;
