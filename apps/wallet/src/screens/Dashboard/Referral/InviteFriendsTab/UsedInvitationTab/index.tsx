import type { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { WalletInvitation } from '@walless/graphql';

import UsedInvitationRow from './UsedInvitationRow';

interface Props {
	claimedReferrals: WalletInvitation[];
}

const UsedInvitationTab: FC<Props> = ({ claimedReferrals }) => {
	return (
		<View style={styles.container}>
			<UsedInvitationRow
				style={styles.titleContainer}
				invitation="Invitation code"
				signUpText="Signup"
				activityPoint="Activity point"
			/>

			<ScrollView style={styles.scrollviewContainer}>
				{claimedReferrals.map((referral) => (
					<UsedInvitationRow
						key={referral.id}
						invitation={referral.code || 'Invalid'}
						signUpText="✅"
						activityPoint="coming soon"
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default UsedInvitationTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		backgroundColor: '#56667433',
	},
	scrollviewContainer: {
		flex: 1,
	},
});
