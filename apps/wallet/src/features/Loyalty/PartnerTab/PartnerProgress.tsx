import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import PointTag from '../components/PointTag';

interface Props {
	style?: ViewStyle;
	totalPoints: number;
	totalTasks: number;
}

const PartnerProgress: FC<Props> = ({ style, totalPoints }) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.horizontalSpaceBetweenContainer}>
				<Text style={styles.highlightText}>Progress</Text>
				<PointTag points={totalPoints} />
			</View>
		</View>
	);
};

export default PartnerProgress;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 40,
		paddingVertical: 16,
		backgroundColor: '#2C353D',
		borderRadius: 16,
	},
	horizontalSpaceBetweenContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	highlightText: {
		fontSize: 16,
		color: 'white',
	},
});
