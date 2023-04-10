import { FC, ReactNode } from 'react';
import { Stack } from '@walless/gui';

interface Props {
	children: ReactNode;
}

const ModalWrapper: FC<Props> = ({ children }) => {
	return (
		<Stack
			backgroundColor="#141B21"
			paddingVertical={16}
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			minHeight="100vh"
		>
			{children}
		</Stack>
	);
};

export default ModalWrapper;
