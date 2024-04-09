import { StyleSheet, View } from 'react-native';
import { Button } from '@walless/gui';
import { navigate } from 'utils/navigation';

const LoyaltyBar = () => {
	const handleNavigateToLoyaltyFeature = () => {
		navigate('Dashboard', {
			screen: 'Explore',
			params: {
				screen: 'Loyalty',
			},
		});
	};

	return (
		<View style={styles.container}>
			<Button
				title="Go to Loyalty screen"
				onPress={handleNavigateToLoyaltyFeature}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0694D3',
		borderRadius: 12,
	},
});

export default LoyaltyBar;
