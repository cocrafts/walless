import { appState, liveActions } from '@walless/engine';
import type { SettingDocument } from '@walless/store';
import type { BootstrapResult } from 'utils/auth';
import { loadRemoteConfig } from 'utils/firebase';
import { ResetAnchors, resetRoute } from 'utils/navigation';
import { storage } from 'utils/storage';

export const bootstrap = async (): Promise<BootstrapResult> => {
	appState.remoteConfig = loadRemoteConfig();
	await liveActions.initialize();
	await liveActions.watchAndSync();

	return appState;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const launchApp = async (config: BootstrapResult): Promise<void> => {
	const settings = await storage.safeGet<SettingDocument>('settings');
	const widgetId = settings?.config?.latestLocation as string;

	if (settings?.profile?.id) {
		resetRoute(ResetAnchors.Widget, { id: widgetId || 'explorer' });
	} else {
		resetRoute(ResetAnchors.Invitation);
	}
};
