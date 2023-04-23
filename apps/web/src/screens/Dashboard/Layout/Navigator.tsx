import { FC } from 'react';
import { Compass } from '@walless/icons';
import { Image, Stack } from '@walless/ui';
import { appState } from 'state/app';
import { extensionState } from 'state/extension';
import { useLocation, useParams, useSnapshot } from 'utils/hooks';

import NavigatorOrb, { OrbConfig } from './NavigatorOrb';

export const Navigator: FC = () => {
	const { profile } = useSnapshot(appState);
	const { map: extensionMap } = useSnapshot(extensionState);
	const extensions = Array.from(extensionMap.values());
	const { pathname } = useLocation();
	const { id: extensionId } = useParams<'id'>();
	const isProfileActive = pathname === '/profile';
	const isExploreActive = pathname === '/';

	const exploreOrb: OrbConfig = {
		route: '/',
		networkMeta: {
			iconColor: '#0694d3',
		} as never,
	};

	const profileOrb: OrbConfig = {
		route: '/profile',
		networkMeta: {
			iconUri: profile.profileImage,
		} as never,
	};

	return (
		<Stack backgroundColor="$primary2" width={58} paddingVertical={12}>
			<Stack flex={1} gap={10}>
				{extensions.map((extension) => {
					const { _id, storeMeta } = extension;
					const iconSrc = { uri: storeMeta.iconUri };
					const isExtensionActive = extensionId === _id;

					return (
						<NavigatorOrb
							key={_id}
							item={extension}
							isActive={isExtensionActive}
						>
							<Image
								src={iconSrc}
								width={storeMeta.iconSize}
								height={storeMeta.iconSize}
							/>
						</NavigatorOrb>
					);
				})}
				<NavigatorOrb item={exploreOrb} isActive={isExploreActive}>
					<Compass />
				</NavigatorOrb>
			</Stack>

			<Stack justifyContent="flex-end">
				<NavigatorOrb item={profileOrb} isActive={isProfileActive} />
			</Stack>
		</Stack>
	);
};

export default Navigator;
