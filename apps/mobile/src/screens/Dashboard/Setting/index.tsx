import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import SettingFeature from '@walless/app/features/Setting';
import type { DashboardParamList } from 'utils/navigation';

type Props = StackScreenProps<DashboardParamList, 'Setting'>;

export const SettingScreen: FC<Props> = () => {
	return (
		<View style={styles.container}>
			<SettingFeature />
		</View>
	);
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		color: '#FFFFFF',
		fontSize: 20,
		fontWeight: '600',
		marginBottom: 20,
	},
});
