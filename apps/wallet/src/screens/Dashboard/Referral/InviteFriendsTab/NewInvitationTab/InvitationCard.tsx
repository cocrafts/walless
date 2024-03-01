import type { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@walless/gui';
import { Copy } from '@walless/icons';
import { showCopiedModal } from 'modals/Notification';
import { copy } from 'utils/system';

interface Props {
	invitation: string;
}

const InvitationCard: FC<Props> = ({ invitation }) => {
	const handleCopy = () => {
		copy(invitation);
		showCopiedModal();
	};

	return (
		<View style={styles.container}>
			<View style={styles.subContainer}>
				<Text style={styles.text}>{invitation}</Text>
				<TouchableOpacity onPress={handleCopy}>
					<Copy />
				</TouchableOpacity>
			</View>

			<View style={styles.separateLine} />

			<Text style={styles.text}>Share</Text>
		</View>
	);
};

export default InvitationCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#ffffff',
		paddingVertical: 12,
	},
	subContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
	},
	text: {
		color: '#ffffff',
		paddingHorizontal: 20,
	},
	separateLine: {
		width: 1,
		height: '100%',
		backgroundColor: '#ffffff',
	},
});
