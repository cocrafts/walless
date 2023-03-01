import React from 'react';
import { Button, Text, View } from '@walless/ui';
import { modalActions } from 'utils/state/modal';

import ChooseLayout from '../ChooseLayout';

const Profile: React.FC = () => {
	const onTestPress = () => {
		modalActions.show({
			id: 'sendModal',
			component: ChooseLayout,
		});
	};
	return (
		<View>
			<Text>Profile</Text>
			<Button title="Test" onPress={onTestPress} />
		</View>
	);
};

export default Profile;
