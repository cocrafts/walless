import type { FC } from 'react';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { ExplorerFeature, StackHeader, WidgetFeature } from '@walless/app';
import { useStoreLastScreen } from 'utils/hooks';
import type { DashboardParamList } from 'utils/navigation';

type Props = DrawerScreenProps<DashboardParamList, 'Explore'>;

export const WidgetScreen: FC<Props> = ({ navigation, route }) => {
	const { id } = route.params as never;
	useStoreLastScreen();

	if (!id) {
		return (
			<ExplorerFeature
				headerComponent={StackHeader}
				onToggleDrawer={navigation.toggleDrawer}
			/>
		);
	}

	return (
		<WidgetFeature
			id={id}
			headerComponent={StackHeader}
			onToggleDrawer={navigation.toggleDrawer}
		/>
	);
};

export default WidgetScreen;
