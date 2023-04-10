import { FC } from 'react';
import Anchor from 'components/Anchor';
import { NavigationConfig } from 'components/layouts/Home/Navigation/shared';

interface Props {
	item: NavigationConfig;
	onPress?: () => void;
}

export const NavigationItem: FC<Props> = ({ item, onPress }) => {
	return (
		<Anchor
			href={item.href}
			marginHorizontal={12}
			fontSize={16}
			onPress={onPress}
			color="$navigationFg"
		>
			{item.title}
		</Anchor>
	);
};

export default NavigationItem;
