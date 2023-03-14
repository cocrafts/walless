import { FC } from 'react';
import { ImageSourcePropType } from 'react-native';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, View } from '@walless/ui';
import { useSnapshot } from 'utils/hook';
import { layoutProxy } from 'utils/state/layout';

import RemoveLayout from './RemoveLayout';

interface Props {
	className?: string;
	layoutKey: string;
	layoutId: string;
	name: string;
	icon: ImageSourcePropType;
	currentRightClickLayoutId: string | null;
}

const LayoutItem: FC<Props> = ({
	className,
	layoutKey,
	layoutId,
	name,
	icon,
	currentRightClickLayoutId,
}) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const layouts = useSnapshot(layoutProxy);
	const key = pathname.split('/')[2];

	return (
		<View className={className}>
			{layouts[key]?.id === layoutId && (
				<View className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-[2px] h-6 bg-white rounded-r-md" />
			)}

			<IconButton
				size={36}
				source={icon}
				className="rounded-lg overflow-hidden"
				onPress={() => navigate(`/layouts/${layoutKey}`)}
			/>

			{currentRightClickLayoutId === layoutId && (
				<RemoveLayout
					className="absolute left-12 top-0 h-24 w-[200px]"
					icon={icon}
					name={name}
					id={layoutId}
				/>
			)}
		</View>
	);
};

export default LayoutItem;
