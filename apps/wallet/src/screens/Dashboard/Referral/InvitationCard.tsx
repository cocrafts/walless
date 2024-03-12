import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { Copy } from '@walless/icons';
import { showCopiedModal } from 'modals/Notification';
import { copy } from 'utils/system';

interface Props {
	code: string;
	points: number;
	isClaimed: boolean;
}

const InvitationCard: FC<Props> = ({ code: code, points, isClaimed }) => {
	const handleCopy = () => {
		copy(code);
		showCopiedModal();
	};

	return (
		<View style={[styles.container, isClaimed && styles.collectedContainer]}>
			<Text>{code}</Text>

			{isClaimed ? (
				<Text>{points} Points</Text>
			) : (
				<Hoverable style={styles.copyButton} onPress={handleCopy}>
					<Copy size={20} />
				</Hoverable>
			)}
		</View>
	);
};

export default InvitationCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 12,
		paddingVertical: 16,
		borderRadius: 16,
		backgroundColor: '#19232C',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	collectedContainer: {
		backgroundColor: '#43525F',
		opacity: 0.4,
	},
	copyButton: {
		backgroundColor: '#FFFFFF0D',
		padding: 8,
		borderRadius: 20,
	},
});
