import type { FC, ReactNode } from 'react';
import { Stack } from '@walless/ui';

interface Props {
	children: ReactNode;
	backgroundColor?: string;
}

const InfoWrapper: FC<Props> = ({ children, backgroundColor }) => {
	return (
		<Stack
			backgroundColor={backgroundColor ?? '#0F151A'}
			borderRadius={16}
			borderWidth={1}
			borderColor="#56667433"
			borderTopLeftRadius={20}
			borderTopRightRadius={20}
		>
			{children}
		</Stack>
	);
};

export default InfoWrapper;
