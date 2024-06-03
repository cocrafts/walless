import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { BlingBling } from '@walless/icons';

import { sharedStyles } from '../internal';

interface Props {
	points: number;
	style?: ViewStyle;
}

const PointTag: FC<Props> = ({ points, style }) => {
	return (
		<View style={[sharedStyles.tagContainer, style]}>
			<View style={[sharedStyles.iconContainer, styles.blingContainer]}>
				<BlingBling size={6} color="white" />
			</View>
			<Text style={styles.text}>{points} Points</Text>
		</View>
	);
};

export default PointTag;

const styles = StyleSheet.create({
	blingContainer: {
		backgroundColor: '#212F3C',
	},
	text: {
		fontSize: 10,
		color: 'white',
	},
});
