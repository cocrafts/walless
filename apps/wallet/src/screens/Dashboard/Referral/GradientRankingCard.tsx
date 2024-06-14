import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import assets from 'utils/assets';

interface Props {
	rank: number;
	rankingPercent: number;
	totalInvites: number;
	style?: ViewStyle;
}

const GradientRankingCard: FC<Props> = ({
	rank,
	rankingPercent,
	totalInvites,
	style,
}) => {
	return (
		<ImageBackground
			source={assets.misc.referralGradientBackground}
			style={[styles.container, style]}
		>
			<View style={[styles.rowDirection, styles.leftGap]}>
				<Text style={styles.text}>{rank !== 0 ? rank : 'N/A'}</Text>
				<View>
					<Text style={styles.text}>Me</Text>
					<Text style={[styles.highlightText, styles.smallText]}>
						You are in top {rank !== 0 ? rankingPercent : 100}%
					</Text>
				</View>
			</View>
			<View style={[styles.rowDirection, styles.rightGap]}>
				<Text style={styles.highlightText}>{totalInvites}</Text>
				<Text style={styles.text}>
					{totalInvites === 1 ? 'Invite' : 'Invites'}
				</Text>
			</View>
		</ImageBackground>
	);
};

export default GradientRankingCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		gap: 8,
		overflow: 'hidden',
	},
	text: {
		color: '#ffffff',
	},
	highlightText: {
		color: '#8BFFEA',
	},
	smallText: {
		fontSize: 10,
	},
	rowDirection: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	leftGap: {
		gap: 12,
	},
	rightGap: {
		gap: 4,
	},
});
