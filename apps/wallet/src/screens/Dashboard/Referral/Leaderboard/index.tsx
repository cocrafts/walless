import { ScrollView, StyleSheet } from 'react-native';
import { shortenAddress } from '@walless/core';
import { Text, View } from '@walless/gui';
import { tabBarHeight } from 'utils/constants';

import { mockReferrals } from './internal';
import LeaderboardRow from './LeaderboardRow';

const LeaderboardTab = () => {
	const containerStyle = {
		paddingBottom: tabBarHeight,
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<Text style={styles.title}>Walless Influencers</Text>

			<LeaderboardRow
				ranking="Ranking"
				account="Account"
				invitation="Invitation"
			/>
			<ScrollView>
				{mockReferrals.map((referral, index) => (
					<LeaderboardRow
						key={index}
						ranking={referral.ranking.toString()}
						account={shortenAddress(referral.account)}
						invitation={referral.invitation.toString()}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default LeaderboardTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 4,
	},
	title: {
		backgroundColor: '#0694D333',
		fontSize: 16,
		fontWeight: '500',
		color: '#ffffff',
		padding: 8,
		textAlign: 'center',
	},
	property: {
		flex: 1,
	},
});
