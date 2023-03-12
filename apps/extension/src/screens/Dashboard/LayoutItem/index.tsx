import { FC } from 'react';
import { ImageSourcePropType } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { IconButton, View } from '@walless/ui';
import { resources } from 'utils/config';

import RemoveLayout from './RemoveLayout';

interface Props {
	className?: string;
	layoutKey: string;
	layoutId: string;
	name: string;
	icon: ImageSourcePropType;
	currentLayoutId: string | null;
}

const LayoutItem: FC<Props> = ({
	className,
	layoutKey,
	layoutId,
	name,
	icon,
	currentLayoutId,
}) => {
	const navigate = useNavigate();

	return (
		<View className={className}>
			<IconButton
				size={36}
				source={resources.icons.solana}
				className="rounded-lg overflow-hidden"
				onPress={() => navigate(`/layouts/${layoutKey}`)}
			/>

			{currentLayoutId === layoutId && (
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
