import { FC, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TouchableOpacity, View } from '@walless/ui';
import { Avatar, ContextMenuContainer } from '@walless/ui/components';
import { CrossIcon } from '@walless/ui/icons';
import { resources } from 'utils/config';
import { useSnapshot } from 'utils/hook';
import { appState } from 'utils/state/app';
import { layoutProxy } from 'utils/state/layout';

import LayoutItem from './LayoutItem';

interface Props {
	children?: ReactNode;
	contentContainerClass?: string;
}

export const DashboardLayout: FC<Props> = ({
	children,
	contentContainerClass = 'flex-1',
}) => {
	const layouts = useSnapshot(layoutProxy);
	const { profile } = useSnapshot(appState);
	const navigate = useNavigate();
	const onExplorePress = () => navigate('/explore');
	const onAvatarPress = () => navigate('/profile');
	const layoutKeys = Object.keys(layouts);

	const [currentLayoutId, setCurrentLayoutId] = useState<string | null>(null);

	const handleContextMenu = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		layoutId: string,
	): void => {
		event.preventDefault();
		setCurrentLayoutId(layoutId === currentLayoutId ? null : layoutId);
	};

	useEffect(() => {
		setCurrentLayoutId(null);
	}, [layoutKeys.length]);

	return (
		<View className="flex-1 flex-row">
			<View className="z-50 w-[50px] bg-color-7 px-1">
				<View className="flex-1 items-center py-4 gap-2">
					{layoutKeys.map((key) => (
						<ContextMenuContainer
							key={key}
							onContextMenu={(event) =>
								handleContextMenu(event, layouts[key].id)
							}
						>
							<LayoutItem
								layoutKey={key}
								name={layouts[key].name}
								layoutId={layouts[key].id}
								icon={resources.icons.solana}
								currentLayoutId={currentLayoutId}
							/>
						</ContextMenuContainer>
					))}
					<TouchableOpacity
						className="w-9 aspect-square border border-[color:#3B6887] rounded-lg justify-center items-center"
						onPress={onExplorePress}
					>
						<CrossIcon size={15} color="#3B6887" />
					</TouchableOpacity>
				</View>
				<View className="justify-end items-center pb-5">
					<TouchableOpacity
						className="aspect-square border border-[color:#3B6887] rounded-lg"
						onPress={onAvatarPress}
					>
						<Avatar
							imageUri={profile.profileImage}
							characters={profile.name || profile.email}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View className={contentContainerClass}>{children}</View>
		</View>
	);
};

export default DashboardLayout;
