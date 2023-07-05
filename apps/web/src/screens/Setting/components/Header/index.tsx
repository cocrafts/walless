import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { type UserProfile } from '@walless/core';
import { View } from '@walless/gui';

import AccountInfo from './AccountInfo';
import Title from './Title';

interface Props {
	profile: UserProfile;
}

export const Header: FC<Props> = ({ profile }) => {
	return (
		<View style={styles.container}>
			<Title />
			<AccountInfo profile={profile} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 20,
	},
});

export default Header;
