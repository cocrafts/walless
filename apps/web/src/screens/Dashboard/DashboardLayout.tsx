import { FC, ReactNode } from 'react';
import { ScrollView, Stack } from '@walless/gui';

interface Props {
	children: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
	return (
		<Stack
			backgroundColor="#19232C"
			minHeight="100vh"
			display="flex"
			flexDirection="row"
		>
			<Stack width={50} height="100vh" backgroundColor="#131C24" />
			<ScrollView flexGrow={1}>{children}</ScrollView>
		</Stack>
	);
};

export default DashboardLayout;
