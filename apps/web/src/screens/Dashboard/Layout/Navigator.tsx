import { FC } from 'react';
import { Stack } from '@walless/gui';
import { Compass } from '@walless/icons';

import NavigatorOrb, { OrbConfig } from './NavigatorOrb';

export const Navigator: FC = () => {
	const exploreOrb: OrbConfig = {
		route: '/',
	};

	const profileOrb: OrbConfig = {
		route: '/profile',
		icon: { uri: '/img/mock-avatar.png' },
	};

	return (
		<Stack
			backgroundColor="$primary2"
			alignItems="center"
			width={58}
			paddingVertical={12}
		>
			<Stack flex={1}>
				<NavigatorOrb item={exploreOrb}>
					<Compass />
				</NavigatorOrb>
			</Stack>

			<Stack alignItems="center" justifyContent="flex-end">
				<NavigatorOrb item={profileOrb} />
			</Stack>
		</Stack>
	);
};

export default Navigator;
