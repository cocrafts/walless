import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { BlingBling } from '@walless/icons';
import assets from 'utils/assets';

interface Props {
	point: number;
	style?: ViewStyle;
}

const PointCard: FC<Props> = ({ point, style }) => {
	return (
		<ImageBackground
			source={assets.misc.loyaltyGradientBackground}
			style={[styles.container, style]}
		>
			<Text style={styles.yourTotalPointsText}>Your total point</Text>
			<View style={styles.horizontal}>
				<View style={styles.blingContainer}>
					<BlingBling size={10} />
				</View>
				<Text style={styles.pointText}>{point}</Text>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 16,
		overflow: 'hidden',
		paddingVertical: 18,
		gap: 8,
	},
	yourTotalPointsText: {
		color: '#CFCFCF',
		fontSize: 12,
	},
	horizontal: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	blingContainer: {
		backgroundColor: '#212F3C',
		alignItems: 'center',
		justifyContent: 'center',
		width: 24,
		height: 24,
		borderRadius: 12,
	},
	pointText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: 'white',
	},
	totalPointsText: {
		fontSize: 14,
		fontWeight: '200',
		color: 'white',
	},
});

export default PointCard;
