import { FC, ReactNode } from 'react';
import { DashboardButton } from '@walless/app';
import { Image, ScrollView, Stack } from '@walless/gui';
import { Compass } from '@walless/icons';
import { router } from 'utils/routing';

interface Props {
	children: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
	const onExplorePress = () => router.navigate('/');
	const onProfilePress = () => router.navigate('/profile');

	return (
		<Stack backgroundColor="#19232C" flex={1} flexDirection="row">
			<Stack backgroundColor="#131C24" padding={8}>
				<Stack flex={1}>
					<DashboardButton onPress={onExplorePress}>
						<Compass size={20} />
					</DashboardButton>
				</Stack>

				<Stack alignItems="center" justifyContent="flex-end">
					<DashboardButton onPress={onProfilePress}>
						<Image
							src={{ uri: '/img/mock-avatar.png' }}
							width={36}
							height={36}
						/>
					</DashboardButton>
				</Stack>
			</Stack>
			<Stack flex={1}>
				<ScrollView>{children}</ScrollView>
			</Stack>
		</Stack>
	);
};

export default DashboardLayout;
