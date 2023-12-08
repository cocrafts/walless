import { useRef } from 'react';
import type { View } from 'react-native';
import type { NavigationState } from '@react-navigation/native';
import { modules } from '@walless/ioc';
import type { SettingDocument } from '@walless/store';
import { analytics } from 'utils/firebase';
import { navigationRef } from 'utils/navigation';

export const useNavigationHydrate = () => {
	const modalContainerRef = useRef<View>(null);
	const routeNameRef = useRef<string>();

	const onNavigationReady = () => {
		routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
	};

	const onNavigationStateChange = async (
		state: NavigationState | undefined,
	) => {
		const currentRoute = state?.routes?.[state?.index];
		const previousRouteName = routeNameRef.current;
		const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

		if (previousRouteName !== currentRouteName) {
			analytics.logScreenView({
				screen_name: currentRouteName,
				screen_class: currentRouteName,
			});

			routeNameRef.current = currentRouteName;

			if (currentRoute?.key) {
				modules.storage.upsert<SettingDocument>('settings', async (doc) => {
					doc.config.latestLocation = {
						name: currentRoute?.name,
						params: currentRoute?.params,
					};

					return doc;
				});
			}
		}
	};

	return {
		modalContainerRef,
		onNavigationReady,
		onNavigationStateChange,
	};
};
