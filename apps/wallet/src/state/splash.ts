import type { BootstrapResult } from '@walless/auth';
import { appState, liveActions } from '@walless/engine';
import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';
import { loadRemoteConfig } from 'utils/firebase';
import { ResetAnchors, resetRoute } from 'utils/navigation';

export const bootstrap = async (): Promise<BootstrapResult> => {
	appState.remoteConfig = loadRemoteConfig();
	// await liveActions.initialize();
	await liveActions.watchAndSync();

	return appState;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const launchApp = async (config: BootstrapResult): Promise<void> => {
	const settings = await modules.storage.safeGet<SettingDocument>('settings');
	const widgetId = settings?.config?.latestLocation as string;

	if (settings?.profile?.id) {
		resetRoute(ResetAnchors.Widget, { id: widgetId || 'explorer' });
	} else {
		resetRoute(ResetAnchors.Invitation);
	}
};
