import { type FC } from 'react';
import { Stack, Text } from '@walless/ui';

import NavBtn from '../SendToken/components/NavBtn';

interface Props {
	onClosePress: () => void;
	onOtherTransactionPress: () => void;
}

const Footer: FC<Props> = ({
	onClosePress: onClose,
	onOtherTransactionPress: onOtherTransactionBtn,
}) => {
	return (
		<Stack
			marginTop="auto"
			marginHorizontal="auto"
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			gap={8}
		>
			<NavBtn content="Back to home" route="/profile" onPress={onClose} />
			<Text fontSize={14} onPress={onOtherTransactionBtn} cursor="pointer">
				Other transaction
			</Text>
		</Stack>
	);
};

export default Footer;
