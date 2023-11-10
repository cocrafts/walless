import { StyleSheet } from 'react-native';
import SettingFeature from '@walless/app/features/Setting';
import { View } from '@walless/gui';
import { router } from 'utils/routing';

const SettingScreen = () => {
	const handleGoBack = () => {
		router.navigate('/profile');
	};

	return (
		<View style={styles.container}>
			<SettingFeature onBack={handleGoBack} />
		</View>
	);
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		paddingTop: 28,
	},
});
