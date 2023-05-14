import { type FC } from 'react';
import { Times } from '@walless/icons';
import { Stack, Text } from '@walless/ui';

interface Props {
	onClose: () => void;
}

const Header: FC<Props> = ({ onClose }) => {
	return (
		<Stack
			display="flex"
			flexDirection="row"
			alignItems="center"
			justifyContent="space-between"
			marginHorizontal={20}
		>
			<Stack width={16} />

			<Text fontSize={14} fontWeight="500">
				Transaction successful
			</Text>

			<Stack onPress={onClose}>
				<Times size={16} />
			</Stack>
		</Stack>
	);
};

export default Header;
