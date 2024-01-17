import { ScrollView } from 'react-native';
import { View } from '@walless/gui';

import { mockNewInvitation } from '../internal';

import InvitationCard from './InvitationCard';

const NewInvitationTab = () => {
	return (
		<View>
			<ScrollView>
				{mockNewInvitation.map((invitation, index) => (
					<InvitationCard key={index} invitation={invitation} />
				))}
			</ScrollView>
		</View>
	);
};

export default NewInvitationTab;
