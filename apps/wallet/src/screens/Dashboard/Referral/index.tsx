import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { Text, View } from '@walless/gui';
import { tabBarHeight } from 'utils/constants';
import { useSafeAreaInsets } from 'utils/hooks';
import type { SettingParamList } from 'utils/navigation';

type Props = StackScreenProps<SettingParamList, 'Referral'>;

export const ReferralScreen: FC<Props> = () => {
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		paddingBottom: tabBarHeight + insets.bottom,
		paddingHorizontal: 8,
	};

	return (
		<View style={containerStyle}>
			<Text>Referral</Text>
		</View>
	);
};

export default ReferralScreen;
