import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FullHistoryFeature } from '@walless/app/features/Profile';
import { Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import { router } from 'utils/routing';

const HistoryScreen = () => {
	const handleNavigateBack = () => {
		router.navigate(-1);
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={handleNavigateBack}>
					<ChevronLeft />
				</TouchableOpacity>
				<Text style={styles.title}>Transaction History</Text>
			</View>

			<FullHistoryFeature />
		</ScrollView>
	);
};

export default HistoryScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 14,
		gap: 14,
	},
	title: {
		fontSize: 20,
		color: '#ffffff',
	},
});
