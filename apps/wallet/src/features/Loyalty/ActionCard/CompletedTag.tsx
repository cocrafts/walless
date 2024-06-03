import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Check } from '@walless/icons';

import { sharedStyles } from '../internal';

interface Props {
	style?: ViewStyle;
}

const CompletedTag: FC<Props> = ({ style }) => {
	return (
		<View style={[sharedStyles.tagContainer, styles.container, style]}>
			<View
				style={[
					styles.iconContainer,
					{ borderColor: 'rgba(47, 200, 121, 0.3)' },
				]}
			>
				<Check size={8} color="#2FC879" />
			</View>
			<Text style={styles.text}>Completed</Text>
		</View>
	);
};

export default CompletedTag;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(47, 200, 121, 0.15)',
	},
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 16,
		height: 16,
		borderWidth: 1,
		borderRadius: 8,
	},
	text: {
		fontSize: 10,
		color: 'white',
	},
});
