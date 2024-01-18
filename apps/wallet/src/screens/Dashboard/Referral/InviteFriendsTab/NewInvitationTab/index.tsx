import { ScrollView, StyleSheet } from 'react-native';

import { mockNewInvitation } from '../internal';

import InvitationCard from './InvitationCard';

const NewInvitationTab = () => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			{mockNewInvitation.map((invitation, index) => (
				<InvitationCard key={index} invitation={invitation} />
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
