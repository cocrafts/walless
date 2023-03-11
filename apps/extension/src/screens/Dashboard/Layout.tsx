import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, TouchableOpacity, View } from '@walless/ui';
import { Avatar, IconButton } from '@walless/ui/components';
import { CrossIcon, TimesIcon } from '@walless/ui/icons';
import { resources } from 'utils/config';
import { useSnapshot } from 'utils/hook';
import { layoutActions, layoutProxy } from 'utils/state/layout';

interface Props {
	children?: ReactNode;
	contentContainerClass?: string;
}

export const DashboardLayout: FC<Props> = ({
	children,
	contentContainerClass = 'flex-1',
}) => {
	const navigate = useNavigate();
	const onExplorePress = () => navigate('/explore');
	const onAvatarPress = () => navigate('/profile');
	const layouts = useSnapshot(layoutProxy);
	const layoutKeys = Object.keys(layouts);

	return (
		<View className="flex-1 flex-row">
			<View className="z-50 w-[50px] bg-color-7 px-1">
				<View className="flex-1 items-center py-4 gap-2">
					{layoutKeys.map((key) => (
						<View key={key}>
							<IconButton
								size={36}
								source={resources.icons.solana}
								className="rounded-lg overflow-hidden"
								onPress={() => navigate(`/layouts/${key}`)}
							/>

							<View className="absolute left-12 top-0 h-24 w-[200px] bg-[#00080E] rounded-lg px-3 py-2 flex gap-3">
								<View className="absolute w-3 h-3 bg-[#00080E] rounded-sm rotate-45 top-3 -left-[2px]" />

								<View className="flex flex-row gap-3 items-center">
									<IconButton
										size={36}
										source={resources.icons.solana}
										className="rounded-lg overflow-hidden"
									/>
									<Text>{layouts[key].name}</Text>
								</View>

								<View className="w-full border border-[#203C4E] rounded-lg" />

								<TouchableOpacity
									className="w-full flex flex-row justify-between items-center"
									onPress={() => layoutActions.removeLayout(layouts[key].id)}
								>
									<Text className="text-[10px] [color:#587A90]">
										Remove this layout
									</Text>
									<View className="flex flex-row justify-center items-center">
										<View className="w-[6px] h-[6px] rounded-[1px] translate-x-1/2 bg-[#203C4E] rotate-45" />
										<View className="w-[12px] h-[10px] rounded-sm bg-[#203C4E] flex justify-center items-center">
											<TimesIcon size={16} color="#4E758E" />
										</View>
									</View>
								</TouchableOpacity>
							</View>
						</View>
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
						className="w-9 aspect-square border border-[color:#3B6887] rounded-lg"
						onPress={onAvatarPress}
					>
						<Avatar />
					</TouchableOpacity>
				</View>
			</View>
			<View className={contentContainerClass}>{children}</View>
		</View>
	);
};

export default DashboardLayout;
