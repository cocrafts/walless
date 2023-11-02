import type { FC } from 'react';
import { View } from 'react-native';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import DashboardNavigator from '@walless/app/features/DashboardLayout/Navigator';
import {
	useSafeAreaInsets,
	useSnapshot,
	useWidgets,
} from '@walless/app/utils/hooks';
import { appState, mockWidgets } from '@walless/engine';
import { modules } from '@walless/ioc';
import type { WidgetDocument } from '@walless/store';
import { appActions } from 'state/app';

export const sidebarWidth = 64;

const IS_HARDCODED = true;

export const Sidebar: FC<DrawerContentComponentProps> = ({ navigation }) => {
	const { profile, activeWidgetId } = useSnapshot(appState);
	const widgets = useWidgets();

	const handleExtensionPress = (item: WidgetDocument) => {
		const id = item._id === '' ? 'Explore' : item._id;
		appActions.setActiveWidgetRoute(id);
		navigation.navigate(id);
	};

	const handleRemoveLayout = async (layout: WidgetDocument) => {
		await modules.storage.put(layout);
		await navigation.navigate('Explore');
	};

	const getRouteActive = (item: WidgetDocument) => {
		return activeWidgetId === (item._id === '' ? 'Explore' : item._id);
	};

	const { top } = useSafeAreaInsets();

	return (
		<View style={{ marginTop: top }}>
			<DashboardNavigator
				profile={profile}
				widgets={IS_HARDCODED ? mockWidgets : widgets}
				size={sidebarWidth}
				getIsExtensionActive={getRouteActive}
				onExtensionPress={handleExtensionPress}
				onRemoveLayout={handleRemoveLayout}
			/>
		</View>
	);
};

export default Sidebar;
