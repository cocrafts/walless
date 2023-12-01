import { StyleSheet } from 'react-native';
import { SettingFeature } from '@walless/app';
import { router } from 'utils/routing';

const SettingScreen = () => {
	const handleGoBack = () => {
		router.navigate('/profile');
	};

	return <SettingFeature onBack={handleGoBack} style={styles.container} />;
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		paddingTop: 28,
	},
});
