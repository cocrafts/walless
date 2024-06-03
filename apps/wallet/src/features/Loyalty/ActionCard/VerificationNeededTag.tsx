import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Exclamation2 } from '@walless/icons';

import { sharedStyles } from '../internal';

interface Props {
	style?: ViewStyle;
}

const VerificationNeededTag: FC<Props> = ({ style }) => {
	return (
		<View style={[sharedStyles.tagContainer, styles.container, style]}>
			<View
				style={[
					styles.iconContainer,
					{ borderColor: 'rgba(255, 190, 102, 0.3)' },
				]}
			>
				<Exclamation2 color="#FFBE66" size={16} />
			</View>
			<Text style={styles.text}>Verification Needed</Text>
		</View>
	);
};

export default VerificationNeededTag;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(255, 190, 102, 0.15)',
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
		color: '#FFBE66',
	},
});
