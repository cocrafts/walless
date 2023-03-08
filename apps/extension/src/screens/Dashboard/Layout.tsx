import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { TouchableOpacity, View } from '@walless/ui';
import { Avatar, IconButton } from '@walless/ui/components';
import { HomeIcon } from '@walless/ui/icons';
import { resources } from 'utils/config';
import { useSnapshot } from 'utils/hook';
import { layoutProxy } from 'utils/state/layout';

interface Props {
	children?: ReactNode;
	contentContainerClass?: string;
}

export const DashboardLayout: FC<Props> = ({
	children,
	contentContainerClass = 'flex-1',
}) => {
	const navigate = useNavigate();
	const onHomePress = () => navigate('/explore');
	const onAvatarPress = () => navigate('/profile');
	const layouts = useSnapshot(layoutProxy);
	const layoutKeys = Object.keys(layouts);

	return (
		<View className="flex-1 flex-row">
			<View className="w-16 bg-color-7 px-2">
				<View className="border-b border-color-3">
					<TouchableOpacity className="items-center py-4" onPress={onHomePress}>
						<HomeIcon size={28} />
					</TouchableOpacity>
				</View>
				<View className="flex-1 items-center py-4 gap-2">
					{layoutKeys.map((key) => (
						<IconButton
							key={key}
							size={48}
							source={resources.icons.solana}
							onPress={() => navigate(`/layouts/${key}`)}
						/>
					))}
				</View>
				<View className="justify-end pb-5">
					<TouchableOpacity className="w-full h-12" onPress={onAvatarPress}>
						<Avatar />
					</TouchableOpacity>
				</View>
			</View>
			<View className={contentContainerClass}>{children}</View>
		</View>
	);
};

export default DashboardLayout;
