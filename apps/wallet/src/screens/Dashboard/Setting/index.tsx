import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import SettingFeature from 'features/Setting';
import type { DashboardParamList } from 'utils/navigation';

type Props = StackScreenProps<DashboardParamList, 'Setting'>;

export const SettingScreen: FC<Props> = () => {
	return <SettingFeature style={styles.container} />;
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 14,
		paddingTop: 16,
		paddingBottom: 36,
	},
});
