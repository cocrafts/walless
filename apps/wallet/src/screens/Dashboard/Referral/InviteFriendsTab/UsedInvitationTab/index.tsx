import { ScrollView, StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import { mockUsedInvitation } from '../internal';

import UsedInvitationRow from './UsedInvitationRow';

const UsedInvitationTab = () => {
	return (
		<View>
			<UsedInvitationRow
				style={styles.titleContainer}
				invitation="Invitation code"
				signup="Signup"
				activityPoint="Acitivity point"
			/>

			<ScrollView>
				{mockUsedInvitation.map((invitation, index) => (
					<UsedInvitationRow
						key={index}
						invitation={invitation}
						signup="✅"
						activityPoint="coming soon"
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default UsedInvitationTab;

const styles = StyleSheet.create({
	titleContainer: {
		backgroundColor: '#56667433',
	},
});
