import { ScrollView, StyleSheet, View } from 'react-native';

import { mockUsedInvitation } from '../internal';

import UsedInvitationRow from './UsedInvitationRow';

const UsedInvitationTab = () => {
	return (
		<View style={styles.container}>
			<UsedInvitationRow
				style={styles.titleContainer}
				invitation="Invitation code"
				signUpText="Signup"
				activityPoint="Activity point"
			/>

			<ScrollView style={styles.scrollviewContainer}>
				{mockUsedInvitation.map((invitation, index) => (
					<UsedInvitationRow
						key={index}
						invitation={invitation}
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
