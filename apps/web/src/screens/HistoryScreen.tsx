import { StyleSheet, TouchableOpacity } from 'react-native';
import { FullHistoryFeature } from '@walless/app/features/Widget/components';
import { Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import { router } from 'utils/routing';

const HistoryScreen = () => {
	const handleNavigateBack = () => {
		router.navigate(-1);
	};

	return (
		<View>
			<View style={styles.header}>
				<TouchableOpacity onPress={handleNavigateBack}>
					<ChevronLeft />
				</TouchableOpacity>
				<Text style={styles.title}>Transaction History</Text>
			</View>

			<FullHistoryFeature />
		</View>
	);
};

export default HistoryScreen;

const styles = StyleSheet.create({
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
