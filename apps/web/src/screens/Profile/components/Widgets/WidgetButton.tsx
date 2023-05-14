import { type FC, type ReactNode } from 'react';
import { Button, Stack } from '@walless/ui';

interface Props {
	children: ReactNode;
	onClick: () => void;
}

const WidgetButton: FC<Props> = ({ children, onClick }) => {
	return (
		<Button
			backgroundColor="#25313D"
			alignItems="center"
			justifyContent="center"
			padding={0}
			width={30}
			height={30}
			onPress={onClick}
		>
			<Stack>{children}</Stack>
		</Button>
	);
};

export default WidgetButton;
