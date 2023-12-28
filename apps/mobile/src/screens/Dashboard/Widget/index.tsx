import type { FC } from 'react';
import {
	ExplorerFeature,
	ProfileFeature,
	StackHeader,
	useResponsive,
	WidgetFeature,
} from '@walless/app';
import type { DrawerScreenProps } from 'components/DrawerNavigation';
import { type ExploreParamList } from 'utils/navigation';

type Props = DrawerScreenProps<ExploreParamList, 'Widget'>;

export const WidgetScreen: FC<Props> = ({ navigation, route }) => {
	const widgetId = route.params?.id;
	const { isMobileResponsive } = useResponsive();
	const HeaderComponent = isMobileResponsive ? StackHeader : undefined;

	const navigateToHistory = () => {
		console.log('TODO: navigate to history');
	};

	if (widgetId === 'explorer') {
		return (
			<ExplorerFeature
				headerComponent={HeaderComponent}
				onToggleDrawer={navigation.toggleDrawer}
			/>
		);
	}

	if (widgetId === 'profile') {
		return <ProfileFeature onNavigateToHistory={navigateToHistory} />;
	}

	return (
		<WidgetFeature
			id={widgetId as string}
			headerComponent={HeaderComponent}
			onToggleDrawer={navigation.toggleDrawer}
		/>
	);
};

export default WidgetScreen;
