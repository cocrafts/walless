import { FC } from 'react';
import { Compass } from '@walless/icons';
import { Image, Stack } from '@walless/ui';
import { extensionState } from 'state/extension';
import { useLocation, useParams, useSnapshot } from 'utils/hooks';

import NavigatorOrb, { OrbConfig } from './NavigatorOrb';

export const Navigator: FC = () => {
	const { extensions } = useSnapshot(extensionState);
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
			iconUri: '/img/mock-avatar.png',
		} as never,
	};

	return (
		<Stack backgroundColor="$primary2" width={58} paddingVertical={12}>
			<Stack flex={1} gap={10}>
				{extensions.map((extension) => {
					const { id, storeMeta } = extension;
					const iconSrc = { uri: storeMeta.iconUri };
					const isExtensionActive = extensionId === id;

					console.log(id, extension.id);
					console.log(isProfileActive, isExploreActive, isExtensionActive);
					return (
						<NavigatorOrb
							key={id}
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
