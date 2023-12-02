import { ScrollView, StyleSheet } from 'react-native';
import { SettingFeature } from '@walless/app';
import { router } from 'utils/routing';

const SettingScreen = () => {
	const handleGoBack = () => {
		router.navigate('/profile');
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<SettingFeature onBack={handleGoBack} style={styles.container} />;
		</ScrollView>
	);
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		paddingTop: 28,
	},
});
