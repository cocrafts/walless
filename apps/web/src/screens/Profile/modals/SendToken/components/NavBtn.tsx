import { FC } from 'react';
import { Stack, Text } from '@walless/ui';
import { router } from 'utils/routing';

interface Props {
	content: string;
	route: string;
	onPress?: () => void;
}

const NavBtn: FC<Props> = ({ content, route, onPress }) => {
	const handlePress = () => {
		onPress && onPress();
		router.navigate(route);
	};

	return (
		<Stack
			display="flex"
			justifyContent="center"
			alignItems="center"
			width={336}
			height={48}
			backgroundColor="#0694D3"
			borderRadius={15}
			onPress={handlePress}
			cursor="pointer"
		>
			<Text fontWeight="500" fontSize={14} color="#FFFFFF">
				{content}
			</Text>
		</Stack>
	);
};

export default NavBtn;
