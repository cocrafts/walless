import { StyleSheet } from 'react-native';
import type { Widget } from '@walless/graphql';
import { Text, View } from '@walless/gui';
import { HomeLayout } from 'components/layouts';
import { WalletList } from 'components/wallets/WalletList';
import { WidgetInfo } from 'features/AdminDashboard';
import { appState } from 'state/internal';
import { useSnapshot } from 'valtio';

const AdminDashboardPage = () => {
	const snap = useSnapshot(appState);
	const widgets = snap.widgetStore.widgets;
	const authenticated = snap.auth.authenticated;

	return (
		<HomeLayout>
			<View style={styles.container}>
				{!authenticated && (
					<Text>To view your widgets, please sign in with</Text>
				)}
				<WalletList />

				{authenticated && widgets.length === 0 && <Text>No widgets</Text>}
				{authenticated &&
					widgets.map((widget) => (
						<WidgetInfo key={widget.id} item={widget as Widget} />
					))}
			</View>
		</HomeLayout>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 16,
	},
});

export default AdminDashboardPage;
