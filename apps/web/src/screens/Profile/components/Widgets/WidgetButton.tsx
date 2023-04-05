import { FC, ReactNode } from 'react';
import { Stack } from '@walless/gui';

interface Props {
	children: ReactNode;
	onClick: () => void;
}

const WidgetButton: FC<Props> = ({ children, onClick }) => {
	return (
		<Stack
			width={30}
			height={30}
			backgroundColor="#25313D"
			borderRadius="100%"
			display="flex"
			alignItems="center"
			justifyContent="center"
			onPress={onClick}
		>
			<Stack>{children}</Stack>
		</Stack>
	);
};

export default WidgetButton;
