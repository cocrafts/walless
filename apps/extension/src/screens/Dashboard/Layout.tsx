import { FC, ReactNode, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useLocation, useNavigate } from 'react-router-dom';
import { TouchableOpacity, View } from '@walless/ui';
import { Avatar, ContextMenuContainer } from '@walless/ui/components';
import { CompassIcon } from '@walless/ui/icons';
import { useSnapshot } from 'utils/hook';
import { appState } from 'utils/state/app';
import { LayoutItem as LayoutType, layoutProxy } from 'utils/state/layout';

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
	const { pathname } = useLocation();
	const isExplorePage = pathname === '/';
	const onExplorePress = () => navigate('/');
	const onAvatarPress = () => navigate('/profile');
	const layoutKeys = Object.keys(layouts);

	const [currentRightClickLayoutId, setCurrentRightClickLayoutId] = useState<
		string | null
	>(null);

	const handleContextMenu = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		layoutId: string,
	): void => {
		event.preventDefault();
		setCurrentRightClickLayoutId(
			layoutId === currentRightClickLayoutId ? null : layoutId,
		);
	};

	useEffect(() => {
		setCurrentRightClickLayoutId(null);
	}, [layoutKeys.length]);

	return (
		<View className="flex-1 flex-row">
			<View className="z-50 w-[50px] bg-color-7 px-1">
				<View className="flex-1 items-center py-4 gap-2">
					{layoutKeys.map((key) => {
						const { id, icon, name } = layouts[key] as LayoutType;

						return (
							<ContextMenuContainer
								key={key}
								onContextMenu={(event) => handleContextMenu(event, id)}
							>
								<LayoutItem
									layoutKey={key}
									name={name}
									layoutId={id}
									icon={icon}
									currentRightClickLayoutId={currentRightClickLayoutId}
								/>
							</ContextMenuContainer>
						);
					})}
					<TouchableOpacity
						className={`w-9 aspect-square border border-[color:#3B6887] rounded-lg justify-center items-center ${
							isExplorePage ? 'border-white bg-white' : 'border-[color:#3B6887]'
						}`}
						onPress={onExplorePress}
					>
						{isExplorePage && (
							<View className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-[2px] h-6 bg-white rounded-r-md" />
						)}
						<CompassIcon
							size={15}
							color={isExplorePage ? 'black' : '#3B6887'}
						/>
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
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className={contentContainerClass}>{children}</View>
			</ScrollView>
		</View>
	);
};

export default DashboardLayout;
