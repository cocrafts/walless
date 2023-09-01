import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { Widget } from '@walless/graphql';
import { Text, View } from '@walless/gui';
import { HomeLayout } from 'components/layouts';
import { WalletList } from 'components/wallets/WalletList';
import { WidgetInfo } from 'features/AdminDashboard';
import { widgetAction } from 'state/index';
import { appState } from 'state/internal';
import { useSnapshot } from 'valtio';

const AdminDashboardPage = () => {
	const snap = useSnapshot(appState);
	const widgets = snap.widgetStore.widgets;
	const pubkey = snap.auth.profile.pubkey;

	const widgetLoadable = pubkey !== '';

	useEffect(() => {
		if (!pubkey) widgetAction.fetchWidgets();
	}, [pubkey]);

	return (
		<HomeLayout>
			<View style={styles.container}>
				<WalletList />

				{!widgetLoadable && (
					<Text>To view your widgets, please connect to a wallet</Text>
				)}
				{widgetLoadable && widgets.length === 0 && <Text>No widgets</Text>}
				{widgetLoadable &&
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
		gap: 32,
	},
});

export default AdminDashboardPage;
