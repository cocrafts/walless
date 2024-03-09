import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import type { IconProps } from '@walless/icons';

interface Props {
	Icon: FC<IconProps>;
	displayName: string;
	ranking: number;
	totalInvitations: number;
}

const HighestRankingCard: FC<Props> = ({
	Icon,
	displayName,
	ranking,
	totalInvitations,
}) => {
	const invitesContainerStyle = {
		paddingVertical: 6 * (5 - ranking),
	};

	const invitesContainerOfTop1 = {
		backgroundColor: '#19232C',
	};

	return (
		<View style={styles.container}>
			<Icon size={8 * (12 - ranking)} />

			<View
				style={[
					styles.invitesContainer,
					invitesContainerStyle,
					ranking === 1 && invitesContainerOfTop1,
				]}
			>
				<Text style={styles.displayName} numberOfLines={1} lineBreakMode="tail">
					{displayName}
				</Text>
				<View style={styles.totalInvitationsContainer}>
					<Text style={styles.totalInvitationsText}>{totalInvitations}</Text>
					<Text style={styles.invitesText}>Invites</Text>
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
	totalInvitationsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	totalInvitationsText: {
		color: '#ffffff',
		fontWeight: '500',
		fontSize: 12,
	},
	invitesText: {
		color: '#657788',
		fontSize: 12,
	},
});
