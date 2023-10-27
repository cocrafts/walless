import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { DashboardParamList } from 'utils/navigation';

type Props = StackScreenProps<DashboardParamList, 'Profile'>;

export const ProfileScreen: FC<Props> = () => {
	return (
		<View style={styles.container}>
			<Text>ProfileScreen</Text>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
