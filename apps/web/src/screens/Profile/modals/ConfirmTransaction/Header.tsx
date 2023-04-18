import { FC } from 'react';
import { ChevronRight, Times } from '@walless/icons';
import { Stack, Text } from '@walless/ui';

interface Props {
	onPressGoBackBtn: () => void;
	onPressCloseBtn: () => void;
}

const Header: FC<Props> = ({ onPressGoBackBtn, onPressCloseBtn }) => {
	return (
		<Stack
			display="flex"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
		>
			<Stack
				rotate="180deg"
				width={24}
				height={24}
				backgroundColor="#25313D"
				borderRadius="100%"
				display="flex"
				justifyContent="center"
				alignItems="center"
				onPress={onPressGoBackBtn}
			>
				<ChevronRight size={16} />
			</Stack>

			<Text fontSize={14} fontWeight="500">
				Confirm transaction
			</Text>

			<Stack onPress={onPressCloseBtn}>
				<Times size={16} />
			</Stack>
		</Stack>
	);
};

export default Header;
