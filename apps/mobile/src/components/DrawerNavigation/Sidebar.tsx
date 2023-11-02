import type { FC } from 'react';
import { View } from 'react-native';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import DashboardNavigator from '@walless/app/features/DashboardLayout/Navigator';
import {
	useSafeAreaInsets,
	useSnapshot,
	useWidgets,
} from '@walless/app/utils/hooks';
import { appState } from '@walless/engine';
import { modules } from '@walless/ioc';
import type { WidgetDocument } from '@walless/store';
import { appActions } from 'state/app';

export const sidebarWidth = 64;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const Sidebar: FC<DrawerContentComponentProps> = ({ navigation }) => {
	const { profile, activeWidgetId } = useSnapshot(appState);
	const widgets = useWidgets();

	const handleExtensionPress = (item: WidgetDocument) => {
		const id = item._id === '' ? 'Explore' : capitalize(item._id);
		appActions.setActiveWidgetRoute(id);
		navigation.navigate(id);
	};

	const handleRemoveLayout = async (layout: WidgetDocument) => {
		await modules.storage.put(layout);
		await navigation.navigate('Explore');
	};

	const getRouteActive = (item: WidgetDocument) => {
		const id = item._id === '' ? 'Explore' : capitalize(item._id);
		return activeWidgetId === id;
	};

	const { top } = useSafeAreaInsets();

	return (
		<View style={{ marginTop: top }}>
			<DashboardNavigator
				profile={profile}
				widgets={widgets}
				size={sidebarWidth}
				getIsExtensionActive={getRouteActive}
				onExtensionPress={handleExtensionPress}
				onRemoveLayout={handleRemoveLayout}
			/>
		</View>
	);
};

export default Sidebar;
