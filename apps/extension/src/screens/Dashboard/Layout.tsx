import { FC, ReactNode } from 'react';
import { View } from '@walless/ui';

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
			<View className="w-16 bg-color-7 px-2" />
			<View className={contentContainerClass}>{children}</View>
		</View>
	);
};

export default DashboardLayout;
