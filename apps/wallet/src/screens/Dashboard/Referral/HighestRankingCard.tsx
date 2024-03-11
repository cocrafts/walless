import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import type { IconProps } from '@walless/icons';

interface Props {
	Icon: FC<IconProps>;
	displayName: string;
	ranking: number;
	totalInvites: number;
}

const HighestRankingCard: FC<Props> = ({
	Icon,
	displayName,
	ranking,
	totalInvites,
}) => {
	const invitesContainerStyle = {
		paddingVertical: 6 * (5 - ranking),
	};

	return (
		<View style={styles.container}>
			<Icon size={8 * (12 - ranking)} />

			<View
				style={[
					styles.invitesContainer,
					invitesContainerStyle,
					ranking === 1 && styles.top1Container,
				]}
			>
				<Text style={styles.displayName} numberOfLines={1} lineBreakMode="tail">
					{displayName}
				</Text>
				<View style={styles.totalInvitesContainer}>
					<Text style={styles.totalInvitesText}>{totalInvites}</Text>
					<Text style={styles.invitesText}>
						{totalInvites === 1 ? 'Invite' : 'Invites'}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default HighestRankingCard;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	top1Container: {
		backgroundColor: '#19232C',
	},
	rankingContainer: {
		height: 20,
		width: 20,
		borderRadius: 10,
		marginTop: -12,
	},
	rankingText: {
		color: '#ffffff',
	},
	invitesContainer: {
		borderTopWidth: 4,
		backgroundColor: '#202D38',
		borderTopColor: '#32404B',
		paddingHorizontal: 12,
		marginTop: 8,
		alignItems: 'center',
		gap: 4,
		width: '100%',
	},
	displayName: {
		color: '#ffffff',
		fontWeight: '500',
		fontSize: 14,
	},
	totalInvitesContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	totalInvitesText: {
		color: '#ffffff',
		fontWeight: '500',
		fontSize: 12,
	},
	invitesText: {
		color: '#657788',
		fontSize: 12,
	},
});
