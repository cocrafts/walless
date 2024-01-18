import type { FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { WalletInvitation } from '@walless/graphql';

import InvitationCard from './InvitationCard';

interface Props {
	unclaimedReferrals: WalletInvitation[];
}

const NewInvitationTab: FC<Props> = ({ unclaimedReferrals }) => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			{unclaimedReferrals.map((referral) => (
				<InvitationCard
					key={referral.id}
					invitation={referral.code || 'Invalid'}
				/>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 12,
		paddingHorizontal: 24,
	},
});

export default NewInvitationTab;
