import type { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@walless/gui';
import { BlingBling, Copy, Kite } from '@walless/icons';
import { showCopiedModal } from 'modals/Notification';
import { copy } from 'utils/system';

interface Props {
	invitation: string;
	points: number;
	isReadyToCollect: boolean;
	isCollected?: boolean;
}

const InvitationCard: FC<Props> = ({
	invitation,
	points,
	isReadyToCollect,
	isCollected = false,
}) => {
	const handleCopy = () => {
		copy(invitation);
		showCopiedModal();
	};

	const collectButton = (
		<View style={styles.buttonContainer}>
			<Text style={[styles.text, styles.mediumText]}>{points} Points</Text>
			<TouchableOpacity
				style={[styles.buttonContainer, styles.collectButton]}
				disabled={!isCollected}
			>
				<BlingBling size={20} />
				<Text style={styles.text}>Collect</Text>
			</TouchableOpacity>
		</View>
	);

	const inviteButton = (
		<View
			style={[styles.buttonContainer, isCollected && styles.collectedContainer]}
		>
			<TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
				<Copy size={20} />
			</TouchableOpacity>
			<TouchableOpacity style={[styles.buttonContainer, styles.inviteButton]}>
				<Kite size={20} />
				<Text style={styles.text}>Invite</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles.mediumText]}>{invitation}</Text>
			{isReadyToCollect ? collectButton : inviteButton}
		</View>
	);
};

export default InvitationCard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		padding: 12,
		borderRadius: 16,
		backgroundColor: '#19232C',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	collectedContainer: {
		backgroundColor: '#43525F',
	},
	text: {
		color: '#ffffff',
	},
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	collectButton: {
		backgroundColor: '#0694D3',
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	inviteButton: {
		borderWidth: 1,
		borderColor: '#0694D3',
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	copyButton: {
		backgroundColor: '#FFFFFF0D',
		padding: 8,
		borderRadius: 20,
	},
	collectedText: {
		color: '#626D77',
	},
	mediumText: {
		fontSize: 16,
	},
});
