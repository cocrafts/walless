import { StyleSheet } from 'react-native';
import SettingFeature from '@walless/app/features/Setting';
import { View } from '@walless/gui';

const SettingScreen = () => {
	return (
		<View style={styles.container}>
			<SettingFeature />
		</View>
	);
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		paddingTop: 28,
	},
});
