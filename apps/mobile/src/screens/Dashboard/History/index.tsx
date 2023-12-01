import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { FullHistoryFeature, useSafeAreaInsets } from '@walless/app';
import { Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import { tabBarHeight } from 'stacks/Dashboard/TabBar';
import { type HomeParamList, navigate } from 'utils/navigation';

type Props = StackScreenProps<HomeParamList, 'History'>;

export const HistoryScreen: FC<Props> = () => {
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		paddingBottom: tabBarHeight + insets.bottom,
		paddingHorizontal: 8,
	};

	const handleGoBack = () => {
		navigate('Dashboard', {
			screen: 'Home',
			params: {
				screen: 'Default',
			},
		});
	};

	return (
		<View style={containerStyle}>
			<View style={styles.header}>
				<TouchableOpacity onPress={handleGoBack}>
					<ChevronLeft />
				</TouchableOpacity>
				<Text style={styles.title}>Transaction History</Text>
			</View>

			<FullHistoryFeature />
		</View>
	);
};

export default HistoryScreen;

const styles = StyleSheet.create({
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
