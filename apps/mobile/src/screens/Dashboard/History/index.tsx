import type { FC } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { FullHistoryFeature } from '@walless/app';
import { Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import { navigate, type ProfileParamList } from 'utils/navigation';

type Props = StackScreenProps<ProfileParamList, 'History'>;

export const HistoryScreen: FC<Props> = () => {
	const handleGoBack = () => {
		navigate('Dashboard', {
			screen: 'Profile',
			params: {
				screen: 'ProfileDashboard',
			},
		});
	};

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleGoBack}>
						<ChevronLeft />
					</TouchableOpacity>
					<Text style={styles.title}>Transaction History</Text>
				</View>

				<FullHistoryFeature />
			</View>
		</SafeAreaView>
	);
};

export default HistoryScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 14,
		gap: 14,
	},
	title: {
		fontSize: 20,
		color: '#ffffff',
	},
});
