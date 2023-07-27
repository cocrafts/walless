import type { FC, ReactNode } from 'react';
import { Stack } from '@walless/ui';

interface Props {
	children: ReactNode;
}

const ModalWrapper: FC<Props> = ({ children }) => {
	return (
		<Stack
			display="flex"
			justifyContent="space-between"
			backgroundColor="#141B21"
			borderTopRightRadius={20}
			borderTopLeftRadius={20}
			paddingVertical={28}
			paddingHorizontal={28}
			gap={24}
		>
			{children}
		</Stack>
	);
};

export default ModalWrapper;
