import { FC, ReactNode } from 'react';
import { TouchableOpacity, View } from '@walless/ui';
import Avatar from '@walless/ui/components/Avatar';
import HomeIcon from '@walless/ui/components/icons/Home';

interface Props {
	children?: ReactNode;
	contentContainerClass?: string;
}

export const DashboardLayout: FC<Props> = ({
	children,
	contentContainerClass = 'flex-1',
}) => {
	return (
		<View className="flex-1 flex-row">
			<View className="w-16 bg-color-7 px-2">
				<View className="border-b border-color-3">
					<TouchableOpacity className="items-center py-4">
						<HomeIcon size={28} />
					</TouchableOpacity>
				</View>
				<View className="flex-1 justify-end pb-5">
					<TouchableOpacity className="w-full h-12">
						<Avatar />
					</TouchableOpacity>
				</View>
			</View>
			<View className={contentContainerClass}>{children}</View>
		</View>
	);
};

export default DashboardLayout;
