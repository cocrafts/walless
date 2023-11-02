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
import type { WidgetDocument } from '@walless/store';

export const sidebarWidth = 64;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const Sidebar: FC<DrawerContentComponentProps> = ({ navigation }) => {
	const { profile } = useSnapshot(appState);
	const widgets = useWidgets();

	const handleExtensionPress = (item: WidgetDocument) => {
		navigation.navigate(item._id === '' ? 'Explore' : capitalize(item._id));
	};

	const { top } = useSafeAreaInsets();

	return (
		<View style={{ marginTop: top }}>
			<DashboardNavigator
				onExtensionPress={handleExtensionPress}
				onRemoveLayout={() => {}}
				profile={profile}
				widgets={widgets}
				size={sidebarWidth}
			/>
		</View>
	);
};

export default Sidebar;
