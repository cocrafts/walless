import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InvitationCodeStepBackground } from '@walless/icons';

interface GetCodeStepCardProps {
	text: string;
}

const GetCodeStepCard: FC<GetCodeStepCardProps> = ({ text }) => {
	return (
		<View style={styles.container}>
			<View style={styles.background}>
				<InvitationCodeStepBackground />
			</View>

			<Text style={styles.text} numberOfLines={2}>
				{text}
			</Text>
		</View>
	);
};

export default GetCodeStepCard;

const styles = StyleSheet.create({
	container: {
		width: 254,
		height: 72,
		paddingHorizontal: 16,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: -1,
	},
	text: {
		color: '#ffffff',
	},
});
