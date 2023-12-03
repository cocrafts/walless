import type { FC } from 'react';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import {
	ExplorerFeature,
	StackHeader,
	useSnapshot,
	WidgetFeature,
} from '@walless/app';
import { appState } from '@walless/engine';
import type { DashboardParamList } from 'utils/navigation';

type Props = DrawerScreenProps<DashboardParamList, 'Explore'>;

export const WidgetScreen: FC<Props> = ({ navigation }) => {
	const { activeWidgetId } = useSnapshot(appState);

	if (!activeWidgetId) {
		return (
			<ExplorerFeature
				headerComponent={StackHeader}
				toggleDrawer={navigation.toggleDrawer}
			/>
		);
	}

	return (
		<WidgetFeature
			id={activeWidgetId}
			headerComponent={StackHeader}
			toggleDrawer={navigation.toggleDrawer}
		/>
	);
};

export default WidgetScreen;
