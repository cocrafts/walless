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
			<View style={[sharedStyles.iconContainer, styles.verificationIcon]}>
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
	verificationIcon: {
		borderWidth: 1,
		borderColor: 'rgba(255, 190, 102, 0.3)',
	},
	text: {
		fontSize: 10,
		color: '#FFBE66',
	},
});
