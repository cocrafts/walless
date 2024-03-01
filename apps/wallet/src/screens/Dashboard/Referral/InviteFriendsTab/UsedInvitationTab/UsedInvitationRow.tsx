import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	style?: ViewStyle;
	invitation: string;
	signUpText: string;
	activityPoint: string;
}

const UsedInvitationRow: FC<Props> = ({
	style,
	invitation,
	signUpText,
	activityPoint,
}) => {
	return (
		<View style={[styles.container, style]}>
			<Text style={styles.text}>{invitation}</Text>
			<Text style={styles.text}>{signUpText}</Text>
			<Text style={styles.text}>{activityPoint}</Text>
		</View>
	);
};

export default UsedInvitationRow;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	text: {
		color: '#ffffff',
		textAlign: 'center',
		flex: 1,
	},
});
