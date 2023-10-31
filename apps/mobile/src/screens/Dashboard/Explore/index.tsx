import type { FC } from 'react';
import { WidgetExplorerFeat } from '@walless/app';
import { useSnapshot } from '@walless/app/utils/hooks';
import { appState } from '@walless/engine';

export const ExplorerScreen: FC = () => {
	const { profile, config } = useSnapshot(appState);

	return <WidgetExplorerFeat profile={profile} appConfig={config} />;
};

export default ExplorerScreen;
