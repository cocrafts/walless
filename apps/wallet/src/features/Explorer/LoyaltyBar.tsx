import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Button } from '@walless/gui';
import { BlingBling } from '@walless/icons';
import assets from 'utils/assets';
import { navigate } from 'utils/navigation';

interface Props {
	style?: ViewStyle;
}

const LoyaltyBar: FC<Props> = ({ style }) => {
	const handleNavigateToLoyaltyFeature = () => {
		navigate('Dashboard', {
			screen: 'Explore',
			params: {
				screen: 'Loyalty',
			},
		});
	};

	return (
		<ImageBackground
			source={assets.misc.loyaltyBarGradientBackground}
			style={[styles.container, style]}
		>
			<View style={styles.leftContainer}>
				<View style={styles.blingContainer}>
					<BlingBling size={18} />
				</View>

				<View style={styles.leftTextContainer}>
					<Text style={styles.highlightText}>Walless Rewards</Text>
					<Text style={styles.subText}>Explore to get more points</Text>
				</View>
			</View>

			<Button
				style={styles.button}
				title="Explore"
				titleStyle={{ fontSize: 12 }}
				onPress={handleNavigateToLoyaltyFeature}
			/>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0694D3',
		borderRadius: 12,
		overflow: 'hidden',
		padding: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	leftTextContainer: {
		height: '100%',
		justifyContent: 'space-between',
		paddingVertical: 3,
	},
	highlightText: {
		fontSize: 14,
		fontWeight: '500',
	},
	subText: {
		fontSize: 12,
	},
	blingContainer: {
		backgroundColor: '#212F3C',
		alignItems: 'center',
		justifyContent: 'center',
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	button: {
		backgroundColor: '#19232C',
		borderRadius: 6,
		paddingHorizontal: 12,
		paddingVertical: 2,
	},
});

export default LoyaltyBar;
