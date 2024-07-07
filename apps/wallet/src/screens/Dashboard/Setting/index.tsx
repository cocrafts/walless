import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import SettingFeature from 'features/Setting';

export const SettingScreen: FC = () => {
	return <SettingFeature style={styles.container} />;
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingHorizontal: 14,
		paddingVertical: 16,
	},
});
