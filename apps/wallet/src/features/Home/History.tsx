import { type FC, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import HistoryFeature from 'features/History';
import { appState } from 'state/app';
import { useHistory, useSnapshot } from 'utils/hooks';
import { navigate } from 'utils/navigation';

export const History: FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { isMobileDisplay } = useSnapshot(appState);
	const history = useHistory();

	const handleNavigateToHistory = () => {
		if (isMobileDisplay) {
			navigate('Dashboard', {
				screen: 'Home',
				params: {
					screen: 'History',
				},
			});
		} else {
			navigate('Dashboard', {
				screen: 'Explore',
				params: {
					screen: 'Profile',
					params: {
						screen: 'History',
					},
				},
			});
		}
	};

	useEffect(() => {
		if (history.length > 0) {
			setIsLoading(false);
		}
	}, [history]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>History</Text>
				<Button style={styles.button} onPress={handleNavigateToHistory}>
					<Text>See All</Text>
				</Button>
			</View>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.transactionsContainer}>
					<HistoryFeature />
				</View>
			)}
		</View>
	);
};

export default History;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		gap: 16,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 20,
		color: '#ffffff',
	},
	transactionsContainer: {
		gap: 8,
	},
	button: {
		paddingHorizontal: 8,
		paddingVertical: 8,
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: '#566674',
	},
});
