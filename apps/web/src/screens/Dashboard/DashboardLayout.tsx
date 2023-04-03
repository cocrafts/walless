import { FC, ReactNode } from 'react';
import { Stack } from '@walless/gui';

interface Props {
	children: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
	return (
		<Stack
			backgroundColor="#1D1D1D"
			minHeight="100vh"
			display="flex"
			flexDirection="row"
		>
			<Stack width={50} height="100vh" backgroundColor="#131C24" />
			<Stack flexGrow={1}>{children}</Stack>
		</Stack>
	);
};

export default DashboardLayout;
