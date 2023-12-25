import type { ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { SettingFeature, useUniversalInsets } from '@walless/app';
import { router } from 'utils/routing';

const SettingScreen = () => {
	const insets = useUniversalInsets();
	const contentContainerStyle: ViewStyle = {
		paddingTop: insets.top,
	};

	const handleGoBack = () => {
		router.navigate('/profile');
	};

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={contentContainerStyle}
		>
			<SettingFeature onBack={handleGoBack} style={styles.container} />
		</ScrollView>
	);
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		paddingTop: 28,
	},
});
