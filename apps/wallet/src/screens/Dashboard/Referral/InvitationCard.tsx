import type { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { Copy, Kite } from '@walless/icons';
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
			<Text
				style={[
					styles.mediumText,
					isCollected ? styles.collectedText : styles.text,
				]}
			>
				{points} Points
			</Text>
			{/* <TouchableOpacity
				style={[styles.buttonContainer, styles.collectButton]}
				disabled={!isCollected}
			>
				<BlingBling size={20} />
				<Text style={styles.text}>Collect</Text>
			</TouchableOpacity> */}
		</View>
	);

	const inviteButton = (
		<View
			style={[styles.buttonContainer, isCollected && styles.collectedContainer]}
		>
			<Hoverable style={styles.copyButton} onPress={handleCopy}>
				<Copy size={20} />
			</Hoverable>
			<TouchableOpacity style={[styles.buttonContainer, styles.inviteButton]}>
				<Kite size={20} />
				<Text style={styles.text}>Invite</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<View
			style={[styles.container, isReadyToCollect && styles.collectedContainer]}
		>
			<Text
				style={[
					styles.mediumText,
					isCollected ? styles.collectedText : styles.text,
				]}
			>
				{invitation}
			</Text>
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
		opacity: 0.4,
	},
	text: {
		color: '#ffffff',
	},
	collectedText: {
		color: '#43525F',
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

	mediumText: {
		fontSize: 14,
	},
});
